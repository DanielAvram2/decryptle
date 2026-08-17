"use client"

import { ChakraProvider, defaultSystem } from "@chakra-ui/react"
import {
  ColorModeProvider,
  type ColorModeProviderProps,
} from "./color-mode"

// import { createSystem, defaultConfig } from "@chakra-ui/react"

// const system = createSystem(defaultConfig, {
//   theme: {
//     tokens: {
//       fonts: {
//          cairopixel: "cairopixel" ,
//         courier: "courier",
//       },
//     },
//   },
// })

export function Provider(props: ColorModeProviderProps) {


  return (
    <ChakraProvider value={defaultSystem}>
      <ColorModeProvider {...props} />
    </ChakraProvider>
  )
}
