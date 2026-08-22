import React, { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";

type KeyPressValue = {
  pressedKey?: string,
  resetPressedKey: () => void
}


const KeyPressContext = createContext<KeyPressValue>({} as KeyPressValue)

export const KeyPressProvider: React.FC<{
  children: ReactNode
}> = ({
  children
}) => {

    const [pressedKey, setPressedKey] = useState<string>()

    const resetPressedKey = useCallback(() => setPressedKey(undefined), [setPressedKey])

    const handleKeyDown = useCallback((event: KeyboardEvent) => {
      setPressedKey(event.key)
    }, [setPressedKey])

    useEffect(() => {
      document.addEventListener('keydown', handleKeyDown);
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      }
    }, []);


    return (
      <KeyPressContext.Provider value={{
        pressedKey,
        resetPressedKey
      }}>
        {children}
      </KeyPressContext.Provider>
    )
  }

const useKeyPress = (): KeyPressValue => {
  return useContext(KeyPressContext)
}

export default useKeyPress