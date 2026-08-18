import { useCallback, useMemo } from "react";
import useCrypto from "../../hooks/useCrypto";
import { Box, Flex } from "@chakra-ui/react";
import { BoxColors } from "../../utils/constants";



const ProgressBar: React.FC = () => {
  const { nrLetters, nrCompletedLetters } = useCrypto();
  console.log(nrLetters, nrCompletedLetters)

  const cellSize = useMemo(() => `calc(100vw / ${26})`, [])

  const ProgressCell: React.FC<{ isCompleted?: boolean }> = useCallback (({ isCompleted }) => {
    return (
      <Box
        minH={cellSize}
        minW={cellSize}
        borderWidth='1px'


        bgColor={isCompleted ? BoxColors.decryptedLetter : BoxColors.encryptedLetter}
      ></Box>
    )
  }, [cellSize])

  return (
    <Flex>
      {(new Array(nrCompletedLetters).fill(null).map((_, index) => (
        <ProgressCell key={`completed-${index}`} isCompleted />
      )))}
      { (new Array(nrLetters - nrCompletedLetters).fill(null).map((_, index) => (
        <ProgressCell key={`empty-${index}`} />
      )))}
    </Flex>
  );
}

export default ProgressBar;