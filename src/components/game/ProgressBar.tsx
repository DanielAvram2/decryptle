import { useCallback, useMemo } from "react";
import useCrypto from "../../hooks/useCrypto";
import { Box, Flex } from "@chakra-ui/react";
import { BoxColors } from "../../utils/constants";
import useIsMobileView from "../../hooks/useIsMobileView";



const ProgressBar: React.FC = () => {
  const { nrLetters, nrCompletedLetters } = useCrypto();
  const isMobileView = useIsMobileView()
  const cellSize = useMemo(() => (
    isMobileView ? (
      `calc(100vw / ${26})`
    ) : (
      `calc(80vh / ${26})`
    )
  ), [isMobileView])

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
      { nrLetters - nrCompletedLetters > 0 && (new Array(nrLetters - nrCompletedLetters).fill(null).map((_, index) => (
        <ProgressCell key={`empty-${index}`} />
      )))}
    </Flex>
  );
}

export default ProgressBar;