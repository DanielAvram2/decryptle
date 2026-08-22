import { Provider } from "./components/ui/provider"
import { CryptoProvider } from './hooks/useCrypto';
import './App.css'
import { Toaster } from './components/ui/toaster';
import { IsMobileViewProvider } from './hooks/useIsMobileView';
import GameLayout from './components/layout/GameLayout';
import { KeyPressProvider } from './hooks/useKeyPress';


const App: React.FC = () => {
  return (
    <Provider
      enableSystem={false}
    >
      <IsMobileViewProvider>
        <KeyPressProvider>
          <CryptoProvider>
            <GameLayout />
          </CryptoProvider>
          <Toaster />
          {/* <ResultModal onClose={() => setIsOpen(false)} isOpen={isOpen}/> */}
        </KeyPressProvider>
      </IsMobileViewProvider>
    </Provider>
  );
}

export default App;
