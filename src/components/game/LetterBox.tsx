import { Box, Flex, Text } from "@chakra-ui/react";
import type { Letter } from "../../utils/types";
import useCrypto from "../../hooks/useCrypto";
import { useCallback, useMemo } from "react";
import { BoxColors } from "../../utils/constants";

interface LetterBoxProps {
  letter: Letter,
  isEncrypted?: boolean,
  isUpperCase?: boolean,
  size?: string,
  fontSize?: string
}

const LetterBox: React.FC<LetterBoxProps> = ({
  letter,
  isEncrypted = true,
  isUpperCase = false,
  size = "2rem",
  fontSize = `calc(${size} * 0.5)`,
}) => {
  const { 
    selectedLetter, setSelectedLetter, setCandidateDecryptionLetter, 
    ecryptionMapping, decryptionMapping, mistakenLetter, clearMistakenLetter 
  } = useCrypto()

  const isSelected = useMemo(() => selectedLetter == letter, [selectedLetter, letter])
  const displayLetter = useMemo(() => isEncrypted ? letter : decryptionMapping[letter]!, [isEncrypted, decryptionMapping, letter])
  
  const selectLetter = useCallback(() => {
    if (!isEncrypted) {
      setSelectedLetter(letter)
      setCandidateDecryptionLetter(displayLetter)
      return
    }
    if (letter === selectedLetter) {
      setSelectedLetter(undefined)
    } else {
      setSelectedLetter(letter)
    }
    setCandidateDecryptionLetter(undefined)
  }, [
    selectedLetter, 
    ecryptionMapping,
    displayLetter, isEncrypted, letter, setCandidateDecryptionLetter, setSelectedLetter
  ])

  return (
    <Box
      className={`flip-card${!isEncrypted ? "-flip" : ""}`}
      minWidth={size}
      minHeight={size}
      maxWidth={size}
      maxHeight={size}
    >
      <Box
        className="flip-card-inner"
      >

        <Flex
          minWidth={size}
          minHeight={size}
          maxWidth={size}
          maxHeight={size}
          justifyContent="center"
          alignItems="center"
          borderWidth="1px"
          marginTop='0.5rem'
          backgroundColor={BoxColors.encryptedLetter}
          onClick={selectLetter}
          className={mistakenLetter === letter ? "horizontal-shake" :"flip-card-front" }
          onAnimationEnd={clearMistakenLetter}
        >
          <Text
            fontFamily={`'block-blueprint', block-blueprint`}
            fontSize={isEncrypted ? "1.5rem" : "1.5rem"}
            fontWeight={isSelected ? "bold" : "nomral"}
            color={isSelected || !isEncrypted ? "yellow" : "black"}
          >
            {isUpperCase ? letter.toUpperCase() : letter}
          </Text>
        </Flex>
        <Flex
          minWidth={size}
          minHeight={size}
          maxWidth={size}
          maxHeight={size}
          justifyContent="center"
          alignItems="center"
          borderWidth="1px"
          marginTop='0.5rem'
          backgroundColor={BoxColors.decryptedLetter}
          onClick={selectLetter}
          className="flip-card-back"
        >
          <Text
            fontFamily={`'courier', courier`}
            fontSize={fontSize}
            fontWeight={isSelected ? "bold" : "normal"}
            color={isSelected ? "yellow" : "black"}
          >
            {decryptionMapping[letter] ? (
              isUpperCase ? decryptionMapping[letter].toUpperCase() : decryptionMapping[letter]
            ) : (
              ""
            )}
          </Text>
        </Flex>
      </Box>
    </Box>
  );
}

export default LetterBox;