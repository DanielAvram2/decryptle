import React, { createContext, useContext, useEffect, useState, type ReactNode } from "react";


const defaultValue: boolean = true

const IsMobileViewContext = createContext<boolean>(defaultValue)

export const IsMobileViewProvider: React.FC<{
  children: ReactNode
}> = ({
  children
}) => {

  const [isMobileView, setIsMobileView] = useState<boolean>(true);

  const handleWindowSizeChange = () => {
    setIsMobileView(window.innerWidth <= 900);
  }
  useEffect(() => {
    handleWindowSizeChange();
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
        window.removeEventListener('resize', handleWindowSizeChange);
    }
  }, []);


  return (
    <IsMobileViewContext.Provider value={isMobileView}>
      {children}
    </IsMobileViewContext.Provider>
  )
}

const useIsMobileView = ():boolean => {
  return useContext(IsMobileViewContext)
}

export default useIsMobileView