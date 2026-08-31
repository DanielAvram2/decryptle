import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react"
import type { Letter } from "../utils/types"
import { isLetter } from "../utils/helperFunctions"
import { toaster } from "../components/ui/toaster"
import usePersistingState from "./usePersistingState"
import useKeyPress from "./useKeyPress"

const GROUND_TRUTH_DECRYPTION: Partial<Record<Letter, Letter>> = {
'k' : 'a',
'p' : 'b',
'g' : 'c',
's' : 'd',
'i' : 'e',
't' : 'f',
'j' : 'g',
'z' : 'h',
'o' : 'i',
'u' : 'j',
'a' : 'k',
'q' : 'l',
'd' : 'm',
'c' : 'n',
'f' : 'o',
'y' : 'p',
'e' : 'q',
'm' : 'r',
'r' : 's',
'x' : 't',
'h' : 'u',
'l' : 'v',
'b' : 'w',
'n' : 'x',
'v' : 'y',
'w' : 'z',
}


const TEXT = `Qoti or qoai k pfn ft gzfgfqkxir, vfh cilim acfb bzkx vfh'mi jfcck jix.`

const TEXT_HINT = `"My momma always said..."`


type CryptoContextValue = {
  selectedLetter?: Letter,
  setSelectedLetter: (newLetter?: Letter) => void,
  candidateDecryptionLetter?: Letter,
  setCandidateDecryptionLetter: (newLetter?: Letter) => void,
  decryptionMapping: Partial<Record<Letter, Letter>>,
  ecryptionMapping: Partial<Record<Letter, Letter>>,
  tryDecrypt: () => boolean,
  decryptedLetters: Set<Letter>,
  trials: Partial<Record<Letter, Letter[]>>
  nrFailedTrials: number,
  cypherText: string,
  nrCompletedLetters: number,
  nrLetters: number,
  mistakenLetter?: Letter,
  clearMistakenLetter: () => void,
  textHint: string
}


const defaultValue: CryptoContextValue = {} as CryptoContextValue

const CryptoContext = createContext(defaultValue)

export const CryptoProvider: React.FC<{ children?: ReactNode }> = ({
  children
}) => {

  const { pressedKey, resetPressedKey } = useKeyPress()

  const [cypherText, _setCypherText] = usePersistingState<string>("cypherText", "")


  const [selectedLetter, setSelectedLetter] = useState<Letter>()
  const [candidateDecryptionLetter, setCandidateDecryptionLetter] = useState<Letter>()
  const [mistakenLetter, setMistakenLetter] = useState<Letter>()

  const [decryptionMapping, setDecryptionMapping, resetDecryptionMapping] = usePersistingState<Partial<Record<Letter, Letter>>>("decryptionMapping", {})
  const [ecryptionMapping, setEcryptionMapping, resetEcryptionMapping] = usePersistingState<Partial<Record<Letter, Letter>>>("ecryptionMapping", {})

  const [nrFailedTrials, setNrFailedTrials, resetNrFailedTrials] = usePersistingState<number>("nrFailedTrials", 0)
  const [nrCompletedLetters, setNrCompletedLetters, resetNrCompletedLetters] = usePersistingState<number>("nrCompletedLetters", 0)
  const [trials, setTrials, resetTrials] = usePersistingState<Partial<Record<Letter, Letter[]>>>("trials", {})

  const resetLocalStorage = useCallback(() => {
    resetDecryptionMapping()
    resetEcryptionMapping()
    resetNrFailedTrials()
    resetNrCompletedLetters()
    resetTrials()
  }, [resetDecryptionMapping, resetEcryptionMapping, resetNrFailedTrials, resetNrCompletedLetters, resetTrials])
  
  const setCypherText = useCallback((newCypherText: string) => {
    console.log(newCypherText)
    console.log(cypherText)
    if (newCypherText !== cypherText) {
      resetLocalStorage()
    }
    _setCypherText(newCypherText)
  }, [cypherText, _setCypherText, resetLocalStorage])

  useEffect(() => {
    setCypherText(TEXT)
  }, [])

  const textHint = useMemo(() => TEXT_HINT, [])

  const nrLetters = useMemo(() => {
    const letterChars = cypherText.split("").filter(char => isLetter(char)).map(char => char.toLowerCase())
    const letterCharsSet = new Set(letterChars)
    return letterCharsSet.size
  }, [cypherText])

  const decryptedLetters = useMemo(() => {
    const letterSet: Set<Letter> = new Set()
    for (const key in decryptionMapping) {
      letterSet.add(decryptionMapping[key as Letter] as Letter)
    }
    return letterSet
  }, [decryptionMapping])

  const tryDecrypt = useCallback(() => {
    if (selectedLetter === undefined || candidateDecryptionLetter === undefined) {
      return false
    }

    if (trials[selectedLetter]?.includes(candidateDecryptionLetter)) {
      toaster.create({
        description: `${selectedLetter} -> ${candidateDecryptionLetter} already guessed`,
        type: "info",
        duration: 1000,
      })
      return false
    }

    if (!(selectedLetter in decryptionMapping)) {
      // ========= checking part =========
      if (GROUND_TRUTH_DECRYPTION[selectedLetter] === candidateDecryptionLetter) {
        // =================================
        const _decryptionMapping = { ...decryptionMapping }
        _decryptionMapping[selectedLetter] = candidateDecryptionLetter
        setDecryptionMapping(_decryptionMapping)

        const _ecryptionMapping = { ...ecryptionMapping }
        _ecryptionMapping[candidateDecryptionLetter] = selectedLetter
        setEcryptionMapping(_ecryptionMapping)

        setSelectedLetter(undefined)
        setCandidateDecryptionLetter(undefined)
        setNrCompletedLetters(nrCompletedLetters + 1)

        return true
      } else {
        // ================= fail ==================

        const newTrials: Partial<Record<Letter, Letter[]>> = {}
        for (const key in trials) {
          newTrials[key as Letter] = [...(trials[key as Letter] ?? [])]
        }
        if (newTrials[selectedLetter] === undefined) {
          newTrials[selectedLetter] = [candidateDecryptionLetter]
        } else {
          newTrials[selectedLetter].push(candidateDecryptionLetter)
        }
        setTrials(newTrials)
        setNrFailedTrials(nrFailedTrials + 1)
        setMistakenLetter(selectedLetter)
        return false
      }
    }
    return true
  }, [decryptionMapping,
    ecryptionMapping,
    selectedLetter,
    candidateDecryptionLetter,
    trials,
    nrFailedTrials,
    nrCompletedLetters,
    setDecryptionMapping,
    setEcryptionMapping, setNrCompletedLetters,
    setNrFailedTrials,
    setTrials])

  const clearMistakenLetter = useCallback(() => setMistakenLetter(undefined), [])


  useEffect(() => {
    if (pressedKey && isLetter(pressedKey)) {
      setCandidateDecryptionLetter(pressedKey as Letter)
    }
    if (pressedKey === 'Escape') {
      setCandidateDecryptionLetter(undefined)
    }
    if (pressedKey === "Enter") {
      queueMicrotask(() => tryDecrypt())
    }
    resetPressedKey()

  }, [pressedKey, setCandidateDecryptionLetter, tryDecrypt])

  return (
    <CryptoContext.Provider
      value={{
        selectedLetter,
        setSelectedLetter,
        decryptionMapping,
        tryDecrypt,
        candidateDecryptionLetter,
        setCandidateDecryptionLetter,
        decryptedLetters,
        trials,
        ecryptionMapping,
        nrFailedTrials,
        cypherText,
        nrLetters,
        nrCompletedLetters,
        mistakenLetter,
        clearMistakenLetter,
        textHint
      }}
    >
      {children}
    </CryptoContext.Provider>
  )
}

const useCrypto = () => useContext(CryptoContext)

export default useCrypto
