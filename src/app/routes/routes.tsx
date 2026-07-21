import type { Routes } from "@b1nd/aid-kit/navigation";
import { HomePage } from "../../pages/home";
import { ProfilePage } from "../../pages/profile";
import { TAB_PATHS } from "../../shared/config/tabs";

export const routes: Routes = {
  tabs: [
    { path: TAB_PATHS.home, element: HomePage },
    { path: TAB_PATHS.profile, element: ProfilePage },
  ],
  stacks: [],
};
