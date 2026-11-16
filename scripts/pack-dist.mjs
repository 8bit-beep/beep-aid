#!/usr/bin/env node
/**
 * Pack dist/ into dist.zip in the S3-deployer-compatible layout (shared with beep-teacher-aid):
 *   index.html (first entry) → other root files → assets/ (directory entry) → assets/*
 *
 * Paths are relative with no `dist/` prefix and no leading `./`.
 * `.DS_Store` and `__MACOSX` are excluded. No extra npm dependencies.
 *
 * Usage (from repo root, after `npm run build`):
 *   node scripts/pack-dist.mjs
 *   DIST_DIR=/path/to/dist OUT=/path/to/dist.zip node scripts/pack-dist.mjs
 */
import {
  existsSync,
  readdirSync,
  readFileSync,
  statSync,
  unlinkSync,
  writeFileSync,
} from "node:fs";
import { dirname, join, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { crc32, deflateRawSync } from "node:zlib";

const repoRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const distDir = resolve(process.env.DIST_DIR || join(repoRoot, "dist"));
const outFile = resolve(process.env.OUT || join(repoRoot, "dist.zip"));

const SKIP_NAMES = new Set([".DS_Store", "Thumbs.db", "__MACOSX"]);

const listFiles = (dir, base = dir) => {
  const found = [];
  for (const name of readdirSync(dir).sort()) {
    if (SKIP_NAMES.has(name) || name.startsWith(".")) continue;
    const abs = join(dir, name);
    const st = statSync(abs);
    if (st.isDirectory()) {
      if (name === "__MACOSX") continue;
      found.push(...listFiles(abs, base));
    } else if (st.isFile()) {
      found.push(relative(base, abs).split(sep).join("/"));
    }
  }
  return found;
};

const toDosDateTime = date => {
  const year = Math.max(date.getFullYear(), 1980);
  const dosTime =
    (date.getHours() << 11) | (date.getMinutes() << 5) | Math.floor(date.getSeconds() / 2);
  const dosDate = ((year - 1980) << 9) | ((date.getMonth() + 1) << 5) | date.getDate();
  return { dosTime, dosDate };
};

const u16 = n => {
  const buf = Buffer.alloc(2);
  buf.writeUInt16LE(n, 0);
  return buf;
};

const u32 = n => {
  const buf = Buffer.alloc(4);
  buf.writeUInt32LE(n >>> 0, 0);
  return buf;
};

const isTextPath = path => /\.(html|css|js|mjs|svg|txt|json|map|md)$/i.test(path);

const unixMode = (path, isDir) => {
  if (isDir) return 0o40755;
  try {
    const mode = statSync(join(distDir, path)).mode;
    return 0o100000 | (mode & 0o777);
  } catch {
    return 0o100644;
  }
};

const mtimeFor = path => {
  try {
    return statSync(join(distDir, path)).mtime;
  } catch {
    return new Date();
  }
};

const collectEntries = () => {
  const indexPath = join(distDir, "index.html");
  if (!existsSync(indexPath) || !statSync(indexPath).isFile()) {
    console.error("dist/index.html not found. Run npm run build first.");
    process.exit(1);
  }

  const rootFiles = [];
  const dirEntries = new Set();
  const nestedFiles = [];

  for (const rel of listFiles(distDir)) {
    if (rel === "index.html") continue;
    const parts = rel.split("/");
    if (parts.length === 1) {
      rootFiles.push(rel);
      continue;
    }
    for (let i = 1; i < parts.length; i += 1) {
      dirEntries.add(`${parts.slice(0, i).join("/")}/`);
    }
    nestedFiles.push(rel);
  }

  return [
    { path: "index.html", kind: "file" },
    ...rootFiles.sort().map(path => ({ path, kind: "file" })),
    ...[...dirEntries].sort().map(path => ({ path, kind: "dir" })),
    ...nestedFiles.sort().map(path => ({ path, kind: "file" })),
  ];
};

const buildLocalHeader = (nameBuf, method, dosTime, dosDate, crc, compressed, uncompressed) =>
  Buffer.concat([
    u32(0x04034b50),
    u16(20),
    u16(0),
    u16(method),
    u16(dosTime),
    u16(dosDate),
    u32(crc),
    u32(compressed),
    u32(uncompressed),
    u16(nameBuf.length),
    u16(0),
    nameBuf,
  ]);

const buildCentralHeader = (
  nameBuf,
  method,
  dosTime,
  dosDate,
  crc,
  compressed,
  uncompressed,
  offset,
  isDir,
  path
) => {
  const mode = unixMode(isDir ? path.replace(/\/$/, "") : path, isDir);
  const extAttr = ((mode & 0xffff) * 0x10000 + (isDir ? 0x10 : 0)) >>> 0;
  const internal = !isDir && isTextPath(path) ? 1 : 0;
  return Buffer.concat([
    u32(0x02014b50),
    u16(0x031e),
    u16(20),
    u16(0),
    u16(method),
    u16(dosTime),
    u16(dosDate),
    u32(crc),
    u32(compressed),
    u32(uncompressed),
    u16(nameBuf.length),
    u16(0),
    u16(0),
    u16(0),
    u16(internal),
    u32(extAttr >>> 0),
    u32(offset),
    nameBuf,
  ]);
};

const entries = collectEntries();
const records = [];

for (const entry of entries) {
  const nameBuf = Buffer.from(entry.path, "utf8");
  const { dosTime, dosDate } = toDosDateTime(mtimeFor(entry.path.replace(/\/$/, "")));

  if (entry.kind === "dir") {
    records.push({
      nameBuf,
      method: 0,
      dosTime,
      dosDate,
      crc: 0,
      data: Buffer.alloc(0),
      uncompressed: 0,
      isDir: true,
      path: entry.path,
    });
    continue;
  }

  const raw = readFileSync(join(distDir, entry.path));
  const crc = crc32(raw) >>> 0;
  const deflated = deflateRawSync(raw, { level: 9 });
  const useStore = deflated.length >= raw.length;
  const data = useStore ? raw : deflated;
  records.push({
    nameBuf,
    method: useStore ? 0 : 8,
    dosTime,
    dosDate,
    crc,
    data,
    uncompressed: raw.length,
    isDir: false,
    path: entry.path,
  });
}

if (existsSync(outFile)) {
  unlinkSync(outFile);
}

const chunks = [];
let offset = 0;
const centrals = [];

for (const rec of records) {
  const local = buildLocalHeader(
    rec.nameBuf,
    rec.method,
    rec.dosTime,
    rec.dosDate,
    rec.crc,
    rec.data.length,
    rec.uncompressed
  );
  const central = buildCentralHeader(
    rec.nameBuf,
    rec.method,
    rec.dosTime,
    rec.dosDate,
    rec.crc,
    rec.data.length,
    rec.uncompressed,
    offset,
    rec.isDir,
    rec.path
  );
  chunks.push(local);
  if (rec.data.length > 0) chunks.push(rec.data);
  centrals.push(central);
  offset += local.length + rec.data.length;
}

const centralDir = Buffer.concat(centrals);
chunks.push(centralDir);
chunks.push(
  Buffer.concat([
    u32(0x06054b50),
    u16(0),
    u16(0),
    u16(records.length),
    u16(records.length),
    u32(centralDir.length),
    u32(offset),
    u16(0),
  ])
);
writeFileSync(outFile, Buffer.concat(chunks));

const first = records[0]?.path;
if (first !== "index.html") {
  console.error(`Expected index.html as the first ZIP entry, got ${first}`);
  process.exit(1);
}

console.log(`Wrote ${outFile}`);
console.log(`${records.length} entries, first=${first}`);
for (const rec of records) {
  console.log(`  ${rec.path}`);
}
