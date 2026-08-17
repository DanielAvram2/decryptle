import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

type WindowDimensions = {
  width: string,
  height: string

}

type LayoutContextValue = {
  // keyboardKeySize: string,
  // windowDimensions: WindowDimensions
}


const defaultValue: LayoutContextValue = {} as LayoutContextValue

const LayoutContext = createContext(defaultValue)

export const LayoutProvider: React.FC<{ children?: ReactNode }> = ({
  children
}) => {
  
  // const [windowDimensions, setWindowDimensions] = useState<WindowDimensions>({width: '0', height: '0'})

  // useEffect(() => {
  //   const handleSize = () => {
  //     const { innerWidth: width, innerHeight: height } = window;
      
  //   }
  // })


  return (
    <LayoutContext.Provider
      value={{
        
      }}
    >
      {children}
    </LayoutContext.Provider>
  )
}

const useLayout = () => useContext(LayoutContext)

export default useLayout