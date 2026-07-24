import { useRouter } from "@b1nd/aid-kit/navigation";
import { useToast } from "@b1nd/dodam-design-system/components";
import { TAB_ITEMS, type TabItem } from "@/shared/config/tabs";

export const useTabNavigate = () => {
  const { tab } = useRouter();
  const toast = useToast();

  const navigateToTab = (path: TabItem["path"]) => {
    const target = TAB_ITEMS.find(item => item.path === path);
    if (target?.isReady === false) {
      toast.warning(`${target.label} 기능은 아직 준비 중이에요`, { position: "top" });
      return;
    }
    tab.move(path);
  };

  return { current: tab.current, navigateToTab };
};
