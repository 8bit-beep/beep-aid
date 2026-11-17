# beep-aid

React + TypeScript + Vite 기반 AID 앱입니다.

## Scripts

```bash
pnpm install
pnpm dev
pnpm build
pnpm lint
pnpm preview
pnpm pack:dist     # dist/ → dist.zip (릴리즈 규격)
pnpm release:zip   # build + pack:dist
```

## 릴리즈 (`dist.zip`)

S3 배포기는 ZIP의 첫 항목 위치를 루트로 보거나 `assets/` 디렉터리 엔트리가 필요할 수 있습니다.
`pnpm pack:dist`는 beep-teacher-aid와 같은 스크립트(`scripts/pack-dist.mjs`)로 항목 순서까지 고정해 만듭니다.

- 첫 항목은 항상 `index.html`
- 그 다음 루트 파일(`beepLogo.svg`, `inappLogo.png` …), `assets/` 디렉터리 엔트리, 에셋 파일 순
- 경로는 상대 경로만 (`dist/` 접두사와 `./` 없음)
- `__MACOSX`, `.DS_Store` 제외

```bash
# .env: 운영 API, 목업 사용자 비활성, 당직 시트 설정 포함
# VITE_API_BASE_URL=https://api.8beep.site/
# VITE_USE_MOCK_USER=false
# VITE_GOOGLE_SHEETS_API_KEY=...
# VITE_DUTY_TEACHER_SHEET_ID=...

pnpm release:zip    # build + pack:dist

unzip -Z1 dist.zip | head -3   # index.html이 첫 항목인지 확인

gh release create vX.Y.Z-temp dist.zip \
  --target <commit-sha> \
  --title "Beep AID temporary release vX.Y.Z" \
  --notes-file <notes.md>
```

다른 경로에 만들려면 `DIST_DIR=/path/to/dist OUT=/path/to/dist.zip pnpm pack:dist`.

### `zip -r dist.zip dist` 금지

`dist` 폴더째 압축하면 ZIP 맨 위에 `dist/`가 한 겹 더 생깁니다(v0.0.9-temp, v0.0.10-temp 최초 업로드).
`cd dist && zip -r ../dist.zip .`도 항목 순서가 디렉터리 순회 순서에 따라 달라져 `index.html`이
첫 항목이 아닐 수 있으므로 쓰지 않습니다.

`vite.config.ts`의 `base: "./"` 때문에 `index.html`과 `assets/`는 반드시 같은 위치에 있어야 합니다.
빌드 결과는 `<script type="module">`이라 http(s)로 서빙해야 실행됩니다(`file://`로 열면 흰 화면).
로컬 확인은 압축을 푼 폴더에서 `npx serve .`.

## AID OAuth 프론트엔드 설정

도담 앱이 WebView URL의 `token` 쿼리로 전달한 도담 토큰을 Beep 백엔드로
전달합니다. 백엔드는 OAuth 처리를 마친 뒤 HttpOnly 세션 쿠키를 발급해야
합니다.

```env
VITE_API_BASE_URL=https://api.dev.8beep.site
VITE_USE_MOCK_USER=false
```

`VITE_API_BASE_URL`을 비워 두면 `/api`를 사용합니다. 일반 브라우저에서 UI만
개발할 때는 로컬 `.env`에서 `VITE_USE_MOCK_USER=true`를 설정할 수 있습니다.

프론트엔드가 사용하는 백엔드 API 계약은 다음과 같습니다.

```text
POST /auth/dodam  { "token": "도담 access token" }
GET  /auth/me     사용자 객체 또는 { "data": 사용자 객체 }
POST /auth/logout
```

사용자 객체는 `name`, `studentInfo`, `username` 문자열을 포함해야 합니다.
