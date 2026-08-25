import { Text } from "@chakra-ui/react";
import useCrypto from "../../hooks/useCrypto";

const HintText: React.FC = () => {
  const { textHint } = useCrypto()
  return (	
    <Text
      fontFamily={`'Calibri', 'italic'`}
    >
      {textHint}
    </Text>
  );
}
 
export default HintText;