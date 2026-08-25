import { Button, CloseButton, Dialog, Portal } from "@chakra-ui/react"
import useCrypto from "../../hooks/useCrypto";
import { useState } from "react";
import useGameState from "../../hooks/useGameState";


const ResultModal: React.FC = () => {
  const {nrFailedTrials} = useCrypto()
  const {isFinished, isWon} = useGameState()
  const [_isOpen, _setIsOpen] = useState(isFinished)
  return (	
    <Dialog.Root open={_isOpen} onOpenChange={() => _setIsOpen(false)} size="cover">
      <Dialog.Trigger asChild>
        <Button variant="outline" size="sm">
          Open Dialog
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>{isWon ? "You won!": "Better Luck next Time!"}</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <p>
                {`Wrong guesses: ${nrFailedTrials ?? 0} / 10` }
              </p>
              <p>
                {`Hints used: ${nrFailedTrials ?? 0} / 3` }
              </p>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button >Admire result</Button>
              </Dialog.ActionTrigger>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
 
export default ResultModal;