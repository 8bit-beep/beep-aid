import { TAB_PATHS } from "@/shared/config/tabs";
import { useTabNavigate } from "@/shared/lib/use-tab-navigate";
import { BannerRow } from "@/shared/ui/banner-row";

export const RoomMoveBanner = () => {
  const { navigateToTab } = useTabNavigate();

  return (
    <BannerRow
      label="실 이동 신청하기"
      onClick={() => navigateToTab(TAB_PATHS.room)}
      trailing={
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
          <path
            d="M7.5 4.5L13 10L7.5 15.5"
            stroke="#9CA3AF"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      }
    />
  );
};
