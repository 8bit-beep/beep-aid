import { AidBridgeError } from "../model/bridge-response";

type UnknownRecord = Record<string, unknown>;

const isRecord = (value: unknown): value is UnknownRecord =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const parsePositiveInteger = (value: unknown): number | null => {
  if (typeof value === "number") {
    return Number.isSafeInteger(value) && value > 0 ? value : null;
  }

  if (typeof value !== "string" || !/^\d+$/.test(value.trim())) {
    return null;
  }

  const number = Number(value.trim());
  return Number.isSafeInteger(number) && number > 0 ? number : null;
};

const parseRoomIdFromText = (rawText: string): number | null => {
  const text = rawText.trim();
  const directRoomId = parsePositiveInteger(text);

  if (directRoomId) {
    return directRoomId;
  }

  try {
    const json = JSON.parse(text) as unknown;
    if (isRecord(json)) {
      const jsonRoomId = parsePositiveInteger(json.roomId);
      if (jsonRoomId) return jsonRoomId;
    }
  } catch {
    // JSON이 아닌 NFC 텍스트는 URL 형식인지 이어서 확인한다.
  }

  try {
    const url = new URL(text);
    const queryRoomId = parsePositiveInteger(url.searchParams.get("roomId"));
    if (queryRoomId) return queryRoomId;

    const pathRoomId = parsePositiveInteger(url.pathname.split("/").filter(Boolean).at(-1));
    if (pathRoomId) return pathRoomId;
  } catch {
    return null;
  }

  return null;
};

const decodeBytes = (bytes: number[]) => {
  try {
    return new TextDecoder().decode(Uint8Array.from(bytes));
  } catch {
    return null;
  }
};

const decodeNdefTextPayload = (payload: unknown): string | null => {
  if (!Array.isArray(payload) || !payload.every(byte => Number.isInteger(byte))) {
    return null;
  }

  const bytes = payload as number[];
  if (bytes.length === 0) return null;

  // NFC Forum Text Record: status byte + language code + UTF-8/UTF-16 text.
  const languageLength = bytes[0] & 0x3f;
  return decodeBytes(bytes.slice(1 + languageLength));
};

const collectTextCandidates = (value: unknown): string[] => {
  if (!isRecord(value)) return [];

  const candidates = [value.text, value.value, value.payload]
    .filter(candidate => typeof candidate === "string")
    .map(candidate => candidate as string);

  if (Array.isArray(value.ndefMessage)) {
    value.ndefMessage.forEach(record => {
      if (!isRecord(record)) return;
      const text = decodeNdefTextPayload(record.payload);
      if (text) candidates.push(text);
    });
  }

  return candidates;
};

export const parseNfcRoomId = (data: unknown): number => {
  const directRoomId = parsePositiveInteger(data);
  if (directRoomId) return directRoomId;

  if (typeof data === "string") {
    const roomId = parseRoomIdFromText(data);
    if (roomId) return roomId;
  }

  if (isRecord(data)) {
    const objectRoomId = parsePositiveInteger(data.roomId);
    if (objectRoomId) return objectRoomId;

    for (const candidate of collectTextCandidates(data)) {
      const roomId = parseRoomIdFromText(candidate);
      if (roomId) return roomId;
    }

    for (const nestedValue of [data.tag, data.data]) {
      if (nestedValue === undefined || nestedValue === data) continue;
      try {
        return parseNfcRoomId(nestedValue);
      } catch {
        // 알려진 중첩 필드에서 찾지 못하면 최종 오류를 사용한다.
      }
    }
  }

  throw new AidBridgeError("등록된 출석 실을 NFC 태그에서 확인할 수 없어요.");
};
