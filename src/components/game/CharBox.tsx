import { Flex, Text } from "@chakra-ui/react";
import { BoxColors } from "../../utils/constants";

interface CharBoxProps {
  char: string
  size?: string,
  color?: string,
  fontSize?: string,
  isEncrypted?: boolean
}

const CharBox: React.FC<CharBoxProps> = ({
  char,
  size = '2rem',
  color = BoxColors.miscChar,
  fontSize = `calc(${size} * 0.5)`,
  isEncrypted = false
}) => {
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