import { Text } from "@chakra-ui/react";
import useCrypto from "../../hooks/useCrypto";

interface GameCounterProps {
  
}

const MAX_GUESSES = 10
 
const GameCounter: React.FC<GameCounterProps> = () => {
  const {nrFailedTrials} = useCrypto();
  return (	
    <Text>
      {`${nrFailedTrials}/${MAX_GUESSES} wrong guesses`} 
    </Text>
  );
}
 
export default GameCounter;