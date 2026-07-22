import { colors } from "@bds-web/colors";
import { TAB_ITEMS, TAB_PATHS } from "@/shared/config/tabs";
import { useTabNavigate } from "@/shared/lib/use-tab-navigate";
import { maskIconStyle } from "@/shared/lib/mask-icon-style";
import arrowIcon from "@/shared/ui/assets/arrow.svg";
import homeIcon from "@/shared/ui/assets/home.svg";
import profileIcon from "@/shared/ui/assets/profile.svg";

const TAB_ICONS: Record<string, string> = {
  [TAB_PATHS.room]: arrowIcon,
  [TAB_PATHS.home]: homeIcon,
  [TAB_PATHS.profile]: profileIcon,
};

const ACTIVE_COLOR = colors.blue.light;
const INACTIVE_COLOR = colors.greyScale[40];

export const Navbar = () => {
  const { current, navigateToTab } = useTabNavigate();

  return (
    <nav className="flex border-t border-gray-200 bg-white">
      {TAB_ITEMS.map(item => {
        const isActive = current === item.path;
        const color = isActive ? ACTIVE_COLOR : INACTIVE_COLOR;

        return (
          <button
            key={item.path}
            type="button"
            onClick={() => navigateToTab(item.path)}
            className="flex flex-1 flex-col items-center gap-1 py-3"
          >
            <span
              aria-hidden
              className="h-6 w-6"
              style={maskIconStyle(TAB_ICONS[item.path], color)}
            />
            <span className="text-xs" style={{ color }}>
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};
