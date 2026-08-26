import type { ComponentType } from "react";
import type { Routes } from "@b1nd/aid-kit/navigation";
import { HomePage } from "@/pages/home";
import { ProfilePage } from "@/pages/profile";
import { TAB_PATHS } from "@/shared/config/tabs";
import { AuthGate } from "../ui/auth-gate";

// 인증 화면도 Router 안에서 렌더해야 한다. 미니앱 탈출용 루트 pop 제스처(왼쪽 엣지
// 스와이프)와 NAVIGATION_POP 브릿지 응답은 aid-kit의 useRootPopAnimation이 쥐고 있고,
// 그 훅은 Router 내부에서만 마운트되기 때문이다. Router 바깥에서 게이트를 걸면
// 토큰 검증 중에만 제스처가 죽는다.
const withAuthGate = (Page: ComponentType) => () => (
  <AuthGate>
    <Page />
  </AuthGate>
);

export const routes: Routes = {
  tabs: [
    { path: TAB_PATHS.home, element: withAuthGate(HomePage), index: true },
    { path: TAB_PATHS.profile, element: withAuthGate(ProfilePage) },
  ],
  stacks: [],
};
