export const TAB_PATHS = {
  home: "/home",
  profile: "/profile",
  room: "/room",
} as const;

export type TabItem = {
  path: (typeof TAB_PATHS)[keyof typeof TAB_PATHS];
  label: string;
};

export const TAB_ITEMS: TabItem[] = [
  { path: TAB_PATHS.room, label: "실이동" },
  { path: TAB_PATHS.home, label: "홈" },
  { path: TAB_PATHS.profile, label: "마이" },
];
