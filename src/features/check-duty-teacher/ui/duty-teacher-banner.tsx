import { BRAND_COLOR } from "@/shared/config/colors";
import { maskIconStyle } from "@/shared/lib/mask-icon-style";
import { BannerRow } from "@/shared/ui/banner-row";
import profileIcon from "@/shared/ui/assets/profile.svg";

export const DutyTeacherBanner = () => {
  const checkDutyTeacher = () => {
    // TODO: 당직 선생님 확인 화면 연결
  };

  return (
    <BannerRow
      label="당직 선생님 확인하기"
      onClick={checkDutyTeacher}
      trailing={
        <span className="flex items-center gap-0.5">
          <span aria-hidden className="h-5 w-5" style={maskIconStyle(profileIcon, BRAND_COLOR)} />
          <span className="text-base font-bold" style={{ color: BRAND_COLOR }}>
            ?
          </span>
        </span>
      }
    />
  );
};
