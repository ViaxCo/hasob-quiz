import { Modal, ModalOverlay, Spinner } from "@chakra-ui/react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const SubmittingOverlay = ({ isOpen, onClose }: Props) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <Spinner
        color="appPurple.500"
        size="xl"
        thickness="4px"
        position="absolute"
        top="50%"
        left="0"
        bottom="0"
        right="0"
        margin="auto"
      />
    </Modal>
  );
};

export default SubmittingOverlay;
