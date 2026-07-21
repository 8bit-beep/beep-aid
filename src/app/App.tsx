import "./styles/app-shell.css";
import type { CSSProperties } from "react";
import { BridgeProvider } from "@b1nd/aid-kit/bridge-kit/web";
import { SafeAreaProvider, useSafeArea } from "@b1nd/aid-kit/safe-area-provider";
import { AppStateProvider } from "@b1nd/aid-kit/app-state";
import { RouteProvider, Router } from "@b1nd/aid-kit/navigation";
import { routes } from "./routes";

type SafeAreaProperties = CSSProperties & {
  "--native-safe-area-top": string;
  "--native-safe-area-bottom": string;
};

function AppShell() {
  const { top, bottom } = useSafeArea();
  const safeAreaStyle: SafeAreaProperties = {
    "--native-safe-area-top": `${top}px`,
    "--native-safe-area-bottom": `${bottom}px`,
  };

  return (
    <div className="app-shell" style={safeAreaStyle}>
      <main className="app-shell__scroll">
        <Router routes={routes} />
      </main>
    </div>
  );
}

function App() {
  return (
    <BridgeProvider>
      <SafeAreaProvider>
        <AppStateProvider>
          <RouteProvider routes={routes}>
            <AppShell />
          </RouteProvider>
        </AppStateProvider>
      </SafeAreaProvider>
    </BridgeProvider>
  );
}

export default App;
