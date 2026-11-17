# beep-aid

## 릴리즈 dist.zip

- 반드시 `pnpm release:zip`(= build + `scripts/pack-dist.mjs`)으로 만든다.
  첫 항목 `index.html` → 루트 파일 → `assets/` 디렉터리 엔트리 → 에셋 순서로 고정된다.
- **`zip -r dist.zip dist` 금지** — 맨 위에 `dist/`가 한 겹 더 생긴다 (v0.0.9/v0.0.10-temp 사고).
  `cd dist && zip -r ../dist.zip .`도 항목 순서가 보장되지 않아 쓰지 않는다.
- 업로드 전 `unzip -Z1 dist.zip | head -3`으로 첫 항목이 `index.html`인지 확인한다.
- 빌드는 운영 `.env`(운영 API, `VITE_USE_MOCK_USER=false`, 당직 시트 키·ID)로 한다.
- 릴리즈 형식: 태그 `vX.Y.Z-temp`, 제목 `Beep AID temporary release vX.Y.Z`, 에셋 `dist.zip`.

beep-teacher-aid도 같은 `pack-dist.mjs`를 쓴다. 자세한 내용은 README.md.
