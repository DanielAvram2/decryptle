import { Flex, Text } from "@chakra-ui/react";
import { ANIMATION_DELAY, ANIMATION_WAIT, BoxColors } from "../../utils/constants";
import useGameState from "../../hooks/useGameState";

interface CharBoxProps {
  char: string
  size?: string,
  color?: string,
  fontSize?: string,
  isEncrypted?: boolean,
  position?: number
}

const CharBox: React.FC<CharBoxProps> = ({
  char,
  size = '2rem',
  color = BoxColors.miscChar,
  fontSize = `calc(${size} * 0.5)`,
  isEncrypted = false,
  position
}) => {
  const {isFinished, isWon} = useGameState()
  return (<Flex
    minWidth={size}
    minHeight={size}
    maxWidth={size}
    maxHeight={size}
    justifyContent="center"
    alignItems="center"
    borderWidth='1px'
    marginTop='0.5rem'
    backgroundColor={color}
    className={`${isFinished && isWon  && position ? "bounce" : ""} unselectable`}
    animationDelay={`${ANIMATION_WAIT + (position ?? 0) * ANIMATION_DELAY}s`}
  >
    <Text
      fontSize={fontSize}
      fontFamily={isEncrypted ? (
        `'block-blueprint', block-blueprint`
      ) : (
        `'courier', courier`
      )}
    >
      {char}
    </Text>
  </Flex>);
}

export default CharBox;