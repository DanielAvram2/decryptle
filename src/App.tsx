import { Provider } from "./components/ui/provider"
import { CryptoProvider } from './hooks/useCrypto';
import './App.css'
import { Toaster } from './components/ui/toaster';
import { IsMobileViewProvider } from './hooks/useIsMobileView';
import GameLayout from './components/layout/GameLayout';
import { KeyPressProvider } from './hooks/useKeyPress';
import { GameMechanicsProvider } from "./hooks/useGameMechanics";
import { GameStateProvider } from "./hooks/useGameState";

const App: React.FC = () => {
 
  return (
    <Provider
      enableSystem={false}
    >
      <IsMobileViewProvider>
        <KeyPressProvider>
          <CryptoProvider>
            <GameStateProvider>
              <GameMechanicsProvider>
                <GameLayout />
              </GameMechanicsProvider>
            </GameStateProvider>
          </CryptoProvider>
          <Toaster />
        </KeyPressProvider>
      </IsMobileViewProvider>
    </Provider>
  );
}

export default App;
