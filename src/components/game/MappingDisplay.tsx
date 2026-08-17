import { Box, Flex, Text } from "@chakra-ui/react";
import useCrypto from "../../hooks/useCrypto";
import CharBox from "./CharBox";
import { BoxColors } from "../../utils/constants";
import { LuArrowRight } from "react-icons/lu";

interface MappingDisplayProps {
  
}
 
const MappingDisplay: React.FC<MappingDisplayProps> = () => {
  const { candidateDecryptionLetter, selectedLetter, decryptionMapping } = useCrypto()

  return (
    <Flex
      alignItems={"center"}
      justifyContent="center"
      gap="1rem"
    >
      <CharBox 
        char={selectedLetter ? selectedLetter : " "}
        size="4rem"
        fontSize="3rem"
        isEncrypted
      />
      <Box
        marginTop="0.5rem"
      >
        <LuArrowRight size="2rem"/>
      </Box>
      <CharBox 
        size="4rem"
        fontSize="3rem"
        char={(selectedLetter && decryptionMapping[selectedLetter]) ? decryptionMapping[selectedLetter] : (candidateDecryptionLetter ? candidateDecryptionLetter : "")}
        color={
          (selectedLetter && decryptionMapping[selectedLetter]) ? BoxColors.decryptedLetter : (candidateDecryptionLetter ? BoxColors.encryptedLetter : BoxColors.miscChar)
        }
      />
    
    </Flex>
  );
}
 
export default MappingDisplay;