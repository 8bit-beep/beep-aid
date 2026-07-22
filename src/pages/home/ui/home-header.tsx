import infoIcon from "@/shared/ui/assets/Info.svg";

export const HomeHeader = () => {
  const openInfo = () => {
    // TODO: 앱 정보 화면 연결
  };

  return (
    <header className="flex items-center justify-between px-1 py-3">
      <img src="/beepLogo.svg" alt="삑" className="h-8 w-auto" />
      <button type="button" onClick={openInfo} aria-label="앱 정보" className="h-9 w-9">
        <img src={infoIcon} alt="info" className="h-9 w-9" />
      </button>
    </header>
  );
};
