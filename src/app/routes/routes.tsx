import type { Routes } from "@b1nd/aid-kit/navigation";
import { HomePage } from "../../page/home";
import { ProfilePage } from "../../page/profile";


export const routes: Routes = {
  tabs: [
    { path: "/home", element: HomePage },
    { path: "/profile", element: ProfilePage}
  ],
  stacks: [],
};
