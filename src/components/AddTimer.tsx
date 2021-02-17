import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  Box,
  Text,
  IconButton,
} from "@chakra-ui/react";
import { CloseIcon, TimerIcon } from "../pages/CreateQuiz";
import { TimePicker } from "antd";
import "antd/dist/antd.css";
import { useState } from "react";
import moment, { Moment } from "moment";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};
const AddTimer = ({ isOpen, onClose }: Props) => {
  const [value, setValue] = useState("");
  const [time, setTime] = useState<Moment>();
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent bg="#EBEBEB" rounded="2xl" p={3}>
        <ModalHeader p={1}>
          <Box
            bg="whiteAlpha.700"
            borderRadius="lg"
            pt={4}
            pr={4}
            pl={2}
            pb={2}
          >
            <Text fontWeight="medium" borderBottom="1px solid gray">
              <TimerIcon
                fontSize="2rem"
                display="inline-block"
                color="appPurple.400"
                mr={2}
              />
              Set Timer
            </Text>
          </Box>
        </ModalHeader>
        <ModalBody p={3}>
          <TimePicker
            defaultValue={moment("00:10:00", "HH:mm:ss")}
            showNow={false}
            value={time}
            size="large"
            style={{ width: "100%" }}
            onChange={(time, timeString) => {
              setTime(time!);
              setValue(timeString);
            }}
          />
        </ModalBody>

        <ModalFooter
          p={2}
          justifyContent="space-between"
          borderTop="1px solid"
          borderColor="blackAlpha.500"
        >
          <IconButton
            aria-label="Close Button"
            colorScheme="blackAlpha"
            variant="ghost"
            onClick={onClose}
            icon={<CloseIcon />}
          />
          <Button
            bg="white"
            _hover={{ bg: "gray.100" }}
            _active={{ bg: "gray.200" }}
            borderRadius="lg"
            boxShadow="md"
            onClick={onClose}
          >
            Set
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddTimer;
