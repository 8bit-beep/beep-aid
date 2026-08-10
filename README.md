# beep-aid

React + TypeScript + Vite 기반 AID 앱입니다.

## Scripts

```bash
pnpm install
pnpm dev
pnpm build
pnpm lint
pnpm preview
```

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
