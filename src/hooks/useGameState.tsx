import { createContext, useContext, useMemo, type ReactNode } from "react";
import useCrypto from "./useCrypto";

type GameStateContextValue = {
  isFinished: boolean
}

const GameStateContext = createContext<GameStateContextValue>({} as GameStateContextValue)

export const GameStateProvider: React.FC<{
  children?: ReactNode
}> = ({ children, }) => {

  const { nrCompletedLetters, nrLetters } = useCrypto()

  const isFinished = useMemo(() => nrLetters === nrCompletedLetters, [nrLetters, nrCompletedLetters])

  return (
    <GameStateContext.Provider value={{
      isFinished
    }}>
      {children}
    </GameStateContext.Provider>
  )
}

const useGameState = (): GameStateContextValue => {
  return useContext(GameStateContext)
}

export default useGameState;