import { createContext, useContext, useMemo, type ReactNode } from "react";
import useCrypto from "./useCrypto";

type GameStateContextValue = {
  isFinished: boolean,
  isWon: boolean
}

const GameStateContext = createContext<GameStateContextValue>({} as GameStateContextValue)

export const GameStateProvider: React.FC<{
  children?: ReactNode
}> = ({ children, }) => {

  const { nrCompletedLetters, nrLetters, nrFailedTrials } = useCrypto()

  const isFinished = useMemo(() => nrLetters === nrCompletedLetters, [nrLetters, nrCompletedLetters])
  const isWon = useMemo(() => nrFailedTrials < 10, [nrFailedTrials])

  return (
    <GameStateContext.Provider value={{
      isFinished,
      isWon
    }}>
      {children}
    </GameStateContext.Provider>
  )
}

const useGameState = (): GameStateContextValue => {
  return useContext(GameStateContext)
}

export default useGameState;