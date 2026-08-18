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


const App: React.FC = () => {
  return (
    <Provider
      enableSystem={false}
    >
      <CryptoProvider>
        <Flex
          direction="column"
          justifyContent="space-between"
          alignItems="center"
          minH="100svh" // svh instead of vh so we don't take into measurement the search bar on phone
        >
          <Flex
            direction="column"
            gap="2rem"
            alignItems="center"
            justifyContent="center"
            flexGrow="1"
          >

            <ProgressBar />
            <LetterGrid />
          </Flex>
          <Flex
            direction="column"
            gap="1rem"
            alignItems="center"
          >
            <GameCounter />
            <MappingDisplay />
            <Keyboard />
          </Flex>
        </Flex>

      </CryptoProvider>
      <Toaster />
      {/* <ResultModal onClose={() => setIsOpen(false)} isOpen={isOpen}/> */}
    </Provider>
  );
}

export default App;
