import { BannerRow } from "@/shared/ui/banner-row";
import { ChevronRightIcon } from "@/shared/ui/chevron-right-icon";

export const HelpFriendAttendanceBanner = () => {
  const helpFriendAttendance = () => {
    // TODO: 친구 출석 도와주기 화면 연결
  };

  return (
    <BannerRow
      label="친구 출석 도와주기"
      onClick={helpFriendAttendance}
      trailing={<ChevronRightIcon />}
    />
  );
};
