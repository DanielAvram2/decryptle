import { Flex } from "@chakra-ui/react";
import { useMemo, type ReactNode } from "react";
import { BoxColors } from "../../utils/constants";

interface KeyboardKeyProps {
  children?: ReactNode,
  onClick?: () => void,
  color?: string,
  isBig?: boolean
}
 
const KeyboardKey: React.FC<KeyboardKeyProps> = ({
  children,
  onClick,
  color=BoxColors.keyboard.normal,
  isBig=false
}) => {
  const size = useMemo(() => 9, [])
  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      minW={isBig ? "14vw" : `${size}vw`}
      minH={`${size * 1.3}vw`}
      maxW={isBig ? "14vw" : `${size}vw`}
      maxH={`${size * 1.3}vw`}
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