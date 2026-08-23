import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import useKeyPress from "./useKeyPress";
import useCrypto from "./useCrypto";
import { isLetter } from "../utils/helperFunctions";

type GameMechanicsContextValue = {
	selectedPosition: number,
	setSelectedPosition: (newPos: number) => void
}

const GameMechanicsContext = createContext<GameMechanicsContextValue>(
	{} as GameMechanicsContextValue
)

export const GameMechanicsProvider: React.FC<{
	children?: ReactNode
}> = ({ children }) => {

	const [selectedPosition, setSelectedPosition] = useState<number>(0)
	const { pressedKey, resetPressedKey } = useKeyPress()
	const { cypherText } = useCrypto()


	useEffect(() => {
		const ctLength = cypherText.length
		if (pressedKey === 'ArrowRight') {
			let nextPos = (selectedPosition + 1) % ctLength;
			while (!isLetter(cypherText[nextPos])) {
				nextPos = (nextPos + 1) % ctLength;
			}
			setSelectedPosition(nextPos)
		}
		if (pressedKey === "ArrowLeft") {
			let nextPos = (ctLength + selectedPosition - 1) % ctLength;
			while (!isLetter(cypherText[nextPos])) {
				nextPos = (ctLength + nextPos - 1) % ctLength
				}
			setSelectedPosition(nextPos)
		}
		resetPressedKey()

	}, [pressedKey, setSelectedPosition, resetPressedKey, cypherText, selectedPosition])


	return (
		<GameMechanicsContext.Provider value={{
			selectedPosition,
			setSelectedPosition
		}}>
			{children}
		</GameMechanicsContext.Provider>
	)
}

const useGameMechanics = (): GameMechanicsContextValue => {
	return useContext(GameMechanicsContext)
}

export default useGameMechanics;