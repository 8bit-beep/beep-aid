import { useLogout } from "@/features/logout/model/use-logout";

export const LogoutButton = () => {
  const { logout } = useLogout();

  return (
    <button
      type="button"
      onClick={logout}
      className="rounded-medium bg-white p-5 text-left text-base font-medium text-red-500 shadow-sm"
    >
      로그아웃
    </button>
  );
};
