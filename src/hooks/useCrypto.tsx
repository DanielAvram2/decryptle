import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react"
import type { Letter } from "../utils/types"
import { isLetter } from "../utils/helperFunctions"
import { toaster } from "../components/ui/toaster"
import usePersistingState from "./usePersistingState"

const GROUND_TRUTH_DECRYPTION: Partial<Record<Letter, Letter>> = {
'b' : 'a',
'z' : 'b',
'm' : 'c',
'v' : 'd',
'p' : 'e',
'x' : 'f',
'j' : 'g',
'u' : 'h',
'd' : 'i',
'o' : 'j',
's' : 'k',
'w' : 'l',
'i' : 'm',
'y' : 'n',
'f' : 'o',
'g' : 'p',
't' : 'q',
'l' : 'r',
'n' : 's',
'h' : 't',
'a' : 'u',
'e' : 'v',
'r' : 'w',
'q' : 'x',
'c' : 'y',
'k' : 'z',
}

const TEXT = "Maldfndhc sdwwpv hup mbh, zah nbhdnxbmhdfy zlfajuh dh zbms."


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
  clearMistakenLetter: () => void
}


const defaultValue: CryptoContextValue = {} as CryptoContextValue

const CryptoContext = createContext(defaultValue)

export const CryptoProvider: React.FC<{ children?: ReactNode }> = ({
  children
}) => {

  const cypherText = useMemo(() => TEXT, [])

  const [selectedLetter, setSelectedLetter] = useState<Letter>()
  const [candidateDecryptionLetter, setCandidateDecryptionLetter] = useState<Letter>()
  const [mistakenLetter, setMistakenLetter] = useState<Letter>()

  const [decryptionMapping, setDecryptionMapping] = usePersistingState<Partial<Record<Letter, Letter>>>("decryptionMapping", {})
  const [ecryptionMapping, setEcryptionMapping] = usePersistingState<Partial<Record<Letter, Letter>>>("ecryptionMapping", {})

  const [nrFailedTrials, setNrFailedTrials] = usePersistingState<number>("nrFailedTrials", 0)
  const [nrCompletedLetters, setNrCompletedLetters] = usePersistingState<number>("nrCompletedLetters", 0)
  const [trials, setTrials] = usePersistingState<Partial<Record<Letter, Letter[]>>>("trials", {})

  const nrLetters = useMemo(() => {
    const letterChars = cypherText.split("").filter(char => isLetter(char)).map(char => char.toLowerCase())
    const letterCharsSet = new Set(letterChars)
    console.log(letterChars)
    return letterCharsSet.size
  }, [cypherText])

  const decryptedLetters = useMemo(() => {
    const letterSet: Set<Letter> = new Set()
    for (const key in decryptionMapping) {
      letterSet.add(decryptionMapping[key as Letter] as Letter)
    }
    return letterSet
  }, [decryptionMapping])


  useEffect(() => {
    console.log("trials", trials)
  }, [trials])

  const tryDecrypt = useCallback(() => {
    if (selectedLetter === undefined || candidateDecryptionLetter === undefined) {
      return false
    }

    if (trials[selectedLetter]?.includes(candidateDecryptionLetter) ) {
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
          console.log(newTrials[key as Letter])
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
  }, [decryptionMapping, ecryptionMapping, selectedLetter, candidateDecryptionLetter, trials, nrFailedTrials, nrCompletedLetters])

  const clearMistakenLetter = useCallback(() => setMistakenLetter(undefined), [])

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
        clearMistakenLetter
      }}
    >
      {children}
    </CryptoContext.Provider>
  )
}

const useCrypto = () => useContext(CryptoContext)

export default useCrypto