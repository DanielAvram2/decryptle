import { useMemo } from "react";
import useIsMobileView from "../../hooks/useIsMobileView";
import { Flex } from "@chakra-ui/react";
import ProgressBar from "../game/ProgressBar";
import LetterGrid from "../game/LetterGrid";
import GameCounter from "../game/GameCounter";
import MappingDisplay from "../game/MappingDisplay";
import Keyboard from "../game/Keyboard";


 
const GameLayout: React.FC = () => {
  const isMobileView = useIsMobileView()
  const height = useMemo(() => (
    isMobileView ? (
      "100%"
    ) : (
      "80%"
    )
  ), [isMobileView])

  return (	
    <Flex
      minH="100svh"
      justifyContent="center"
      alignItems="center"
      position="relative"
    >

    <Flex
            direction="column"
            justifyContent="space-between"
            alignItems="center"
            minH={height} // svh instead of vh so we don't take into measurement the search bar on phone
            maxH={height}
            overflow="scroll"
            position="absolute" // just for it to actually take the whole height

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
    </Flex>

  );
}
 
export default GameLayout;