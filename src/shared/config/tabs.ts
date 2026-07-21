export const TAB_PATHS = {
  home: "/home",
  profile: "/profile",
  room: "/room",
} as const;

export type TabItem = {
  path: (typeof TAB_PATHS)[keyof typeof TAB_PATHS];
  label: string;
  /** false면 아직 라우트가 없는 탭 — 눌러도 이동하지 않음 */
  isReady?: boolean;
};

export const TAB_ITEMS: TabItem[] = [
  { path: TAB_PATHS.room, label: "실 이동", isReady: false },
  { path: TAB_PATHS.home, label: "홈" },
  { path: TAB_PATHS.profile, label: "마이" },
];
