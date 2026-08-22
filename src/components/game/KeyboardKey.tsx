import { Flex } from "@chakra-ui/react";
import { useMemo, type ReactNode } from "react";
import { BoxColors } from "../../utils/constants";
import useIsMobileView from "../../hooks/useIsMobileView";

interface KeyboardKeyProps {
  children?: ReactNode,
  onClick?: () => void,
  color?: string,
  isBig?: boolean
}
 
const BASE_W = 9

const KeyboardKey: React.FC<KeyboardKeyProps> = ({
  children,
  onClick,
  color=BoxColors.keyboard.normal,
  isBig=false
}) => {
  const isMobileView = useIsMobileView()
  const width = useMemo(() => (
    isMobileView ? (
      isBig ? `${BASE_W * 14 / 9}vw` : `${BASE_W }vw`
    ) : (
      isBig ? `${BASE_W * 7 / 9}rem` : `${BASE_W / 2}rem`
    )
    ), [isMobileView, isBig])

  const height = useMemo(() => (
    isMobileView ? (
      `${BASE_W  * 1.3}vw`
    ) : (
      `${BASE_W * 1.3 / 2}rem`
    )
  ), [isMobileView, isBig])
  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      minW={width}
      maxW={width}
      minH={height}
      maxH={height}
      bgColor={color}
      color="white"
      fontFamily={`courier`}
      fontWeight="bold"
      fontSize="1.5rem"
      borderRadius="0.3rem"
      onClick={onClick}
    >
      {children}
    </Flex>
  );
}
 
export default KeyboardKey;