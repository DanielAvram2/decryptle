import { Box, Flex } from "@chakra-ui/react";
import { isLetter, isUpperCase } from "../../utils/helperFunctions";
import LetterBox from "./LetterBox";
import type { Letter } from "../../utils/types";
import CharBox from "./CharBox";
import useCrypto from "../../hooks/useCrypto";
import { useMemo } from "react";
import useIsMobileView from "../../hooks/useIsMobileView";




const LetterGrid: React.FC = () => {
  const { decryptionMapping, cypherText } = useCrypto()
  const isMobileView = useIsMobileView()
  const longestWordLength = useMemo(() => {
    return cypherText.split(" ").sort((a, b) => b.length - a.length)[0].length
  }, [cypherText])
  const boxSize = useMemo(() => (
    isMobileView ?
      `${Math.floor(100 / longestWordLength) - 2}svw`
    :
      `${Math.floor(70 / longestWordLength) - 2}vw`
  ), [longestWordLength, isMobileView])
  return (
    <Flex
      h="100%"
      alignItems="center"
      justifyContent="center"
      maxW="100%"
    >
      <Box>
        <Flex
          flexWrap="wrap"
          justifyContent="center"
        >
          {cypherText.split(" ").map((word, wordIndex) => (
            <Flex key={`row-${wordIndex}`}>
              {word.split('').map((character, characterIndex) => {
                if (!isLetter(character)) {
                  return (
                    <CharBox key={`char-${wordIndex}-${characterIndex}`} char={character} size={boxSize} />
                  )
                }
                const letter = character.toLowerCase() as Letter
                const isEncrypted = !(decryptionMapping && (letter in decryptionMapping))
                return (
                  <LetterBox
                    key={`char-${wordIndex}-${characterIndex}`}
                    letter={letter}
                    isUpperCase={isUpperCase(character)}
                    isEncrypted={isEncrypted}
                    size={boxSize}
                  />
                )

              })}
              {wordIndex !== cypherText.split(" ").length - 1 && <CharBox char={" "} size={boxSize} />}
            </Flex>
          ))}
        </Flex>
      </Box>
    </Flex>
  );
}

export default LetterGrid;