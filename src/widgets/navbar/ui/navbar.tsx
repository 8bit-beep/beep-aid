import { useRouter } from "@b1nd/aid-kit/navigation";
import { TAB_ITEMS, TAB_PATHS } from "@/shared/config/tabs";
import arrowIcon from "@/shared/ui/assets/arrow.svg";
import homeIcon from "@/shared/ui/assets/home.svg";
import profileIcon from "@/shared/ui/assets/profile.svg";

const TAB_ICONS: Record<string, string> = {
  [TAB_PATHS.room]: arrowIcon,
  [TAB_PATHS.home]: homeIcon,
  [TAB_PATHS.profile]: profileIcon,
};

const ACTIVE_COLOR = "#3B6EA5";
const INACTIVE_COLOR = "#7D7D7D";

export const Navbar = () => {
  const { tab } = useRouter();

  return (
    <nav className="flex border-t border-gray-200 bg-white">
      {TAB_ITEMS.map((item) => {
        const isActive = tab.current === item.path;
        const color = isActive ? ACTIVE_COLOR : INACTIVE_COLOR;

        const maskImage = `url("${TAB_ICONS[item.path]}")`;

        return (
          <button
            key={item.path}
            type="button"
            onClick={() => tab.move(item.path)}
            className="flex flex-1 flex-col items-center gap-1 py-3"
          >
            <span
              aria-hidden
              className="h-6 w-6"
              style={{
                backgroundColor: color,
                WebkitMaskImage: maskImage,
                maskImage: maskImage,
                WebkitMaskRepeat: "no-repeat",
                maskRepeat: "no-repeat",
                WebkitMaskPosition: "center",
                maskPosition: "center",
                WebkitMaskSize: "contain",
                maskSize: "contain",
              }}
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
