import { useRouter } from "@b1nd/aid-kit/navigation";
import { TAB_ITEMS, type TabItem } from "@/shared/config/tabs";

export const useTabNavigate = () => {
  const { tab } = useRouter();

  const navigateToTab = (path: TabItem["path"]) => {
    const target = TAB_ITEMS.find(item => item.path === path);
    if (target?.isReady === false) return; // TODO: 토스트 알림으로 교체
    tab.move(path);
  };

  return { current: tab.current, navigateToTab };
};
