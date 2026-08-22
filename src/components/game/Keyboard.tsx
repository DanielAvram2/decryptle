import { Flex } from "@chakra-ui/react";
import KeyboardKey from "./KeyboardKey";
import { LuDelete } from "react-icons/lu";
import useCrypto from "../../hooks/useCrypto";
import { useCallback, useEffect } from "react";
import type { Letter } from "../../utils/types";
import { BoxColors } from "../../utils/constants";
import { HiMiniArrowTurnDownLeft } from "react-icons/hi2";
import useKeyPress from "../../hooks/useKeyPress";
import { isLetter } from "../../utils/helperFunctions";

const FIRST_ROW = "qwertyuiop"
const SECOND_ROW = "asdfghjkl"
const THIRD_ROW = "zxcvbnm"


const GAP = "0.5vw"
const Keyboard: React.FC = () => {

  const { trials, decryptedLetters, selectedLetter, tryDecrypt, setCandidateDecryptionLetter } = useCrypto()

  const onDelete = useCallback(() => {
    setCandidateDecryptionLetter(undefined)
  }, [setCandidateDecryptionLetter])

  const LetterKey: React.FC<{ keyboardKey: string, index: number }> = useCallback(({ keyboardKey, index }) => (
    <KeyboardKey
      key={`first-row-${index}`}
      onClick={() => setCandidateDecryptionLetter(keyboardKey as Letter)}
      color={
        decryptedLetters.has(keyboardKey as Letter)
          ? BoxColors.keyboard.guessed
          : (selectedLetter && trials[selectedLetter]?.includes(keyboardKey as Letter))
            ? BoxColors.keyboard.tried
            : BoxColors.keyboard.normal
      }

    >
      {keyboardKey}
    </KeyboardKey>
  ), [decryptedLetters, selectedLetter, trials, setCandidateDecryptionLetter])

  return (
    <Flex
      direction="column"
      justifyContent="center"
      alignItems="center"
      gap={GAP}
      paddingBottom="3vw"
    >
      <Flex
        gap={GAP}
      >
        {FIRST_ROW.split("").map((keyaboardKey, index) => (
          <LetterKey
            key={`first-row-${index}`}
            keyboardKey={keyaboardKey} 
            index={index} 
          />
        ))}
      </Flex>
      <Flex
        gap={GAP}
      >
        {SECOND_ROW.split("").map((keyaboardKey, index) => (
          <LetterKey
            key={`second-row-${index}`}
            keyboardKey={keyaboardKey} 
            index={index} 
          />

        ))}
      </Flex>

      <Flex
        gap={GAP}
      >
        <KeyboardKey
          onClick={tryDecrypt}
          isBig
        >

            {/* <Text fontSize="0.8rem">Enter</Text> */}
            <HiMiniArrowTurnDownLeft />
        </KeyboardKey>
        {THIRD_ROW.split("").map((keyaboardKey, index) => (
          <LetterKey 
            key={`third-row-${index}`}
            keyboardKey={keyaboardKey} 
            index={index} 
          />

        ))}
        <KeyboardKey
          onClick={onDelete}
          isBig
        >

            <LuDelete />
        </KeyboardKey>
      </Flex>

    </Flex>
  );
}

export default Keyboard;