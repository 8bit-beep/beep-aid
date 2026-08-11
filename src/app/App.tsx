import "./styles/app-shell.css";
import { useEffect, type CSSProperties } from "react";
import { BridgeProvider } from "@b1nd/aid-kit/bridge-kit/web";
import { SafeAreaProvider, useSafeArea } from "@b1nd/aid-kit/safe-area-provider";
import { AppStateProvider } from "@b1nd/aid-kit/app-state";
import { RouteProvider, Router, useRouter } from "@b1nd/aid-kit/navigation";
import { AuthProvider } from "@/features/auth";
import { Navbar } from "@/widgets/navbar";
import { ToastProvider } from "@/shared/ui/toast";
import { TAB_PATHS } from "@/shared/config/tabs";
import { routes } from "./routes";

type SafeAreaProperties = CSSProperties & {
  "--native-safe-area-top": string;
  "--native-safe-area-bottom": string;
};

const VALID_TAB_PATHS = routes.tabs.map(tab => tab.path);

function AppShell() {
  const { top, bottom } = useSafeArea();
  const { tab } = useRouter();
  const safeAreaStyle: SafeAreaProperties = {
    "--native-safe-area-top": `${top}px`,
    "--native-safe-area-bottom": `${bottom}px`,
  };

  useEffect(() => {
    if (!VALID_TAB_PATHS.includes(tab.current)) {
      tab.move(TAB_PATHS.home);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="app-shell" style={safeAreaStyle}>
      <main className="app-shell__scroll">
        <ToastProvider />
        <Router routes={routes} />
      </main>
      <Navbar />
    </div>
  );
}

function App() {
  return (
    <BridgeProvider>
      <SafeAreaProvider>
        <AppStateProvider>
          <AuthProvider>
            <RouteProvider routes={routes}>
              <AppShell />
            </RouteProvider>
          </AuthProvider>
        </AppStateProvider>
      </SafeAreaProvider>
    </BridgeProvider>
  );
}

export default App;
