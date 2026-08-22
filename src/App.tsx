import { Flex } from '@chakra-ui/react';
import { Provider } from "./components/ui/provider"
import LetterGrid from './components/game/LetterGrid';
import { CryptoProvider } from './hooks/useCrypto';
import MappingDisplay from './components/game/MappingDisplay';
import './App.css'
import Keyboard from './components/game/Keyboard';
import GameCounter from './components/game/GameCounter';
import ProgressBar from './components/game/ProgressBar';
import { Toaster } from './components/ui/toaster';
import useIsMobileView, { IsMobileViewProvider } from './hooks/useIsMobileView';
import { useMemo } from 'react';
import GameLayout from './components/layout/GameLayout';


const App: React.FC = () => {
  return (
    <Provider
      enableSystem={false}
    >
      <IsMobileViewProvider>

        <CryptoProvider>
          <GameLayout />
        </CryptoProvider>
        <Toaster />
        {/* <ResultModal onClose={() => setIsOpen(false)} isOpen={isOpen}/> */}
      </IsMobileViewProvider>
    </Provider>
  );
}

export default App;
