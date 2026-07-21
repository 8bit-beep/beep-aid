import type { Routes } from "@b1nd/aid-kit/navigation";
import { HomePage } from "../../pages/home";
import { ProfilePage } from "../../pages/profile";


export const routes: Routes = {
  tabs: [
    { path: "/home", element: HomePage },
    { path: "/profile", element: ProfilePage}
  ],
  stacks: [],
};
