import {
  Box,
  Button,
  chakra,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Radio,
  RadioGroup,
  Text,
  useToast,
  VStack,
  StackDivider,
  useDisclosure,
  Stack,
} from "@chakra-ui/react";
import { useState } from "react";
import Header from "../components/Header";
import { GrClose } from "react-icons/gr";
import { AiFillHome } from "react-icons/ai";
import { IoMdTrash } from "react-icons/io";
import { MdTimer } from "react-icons/md";
import AddTimer from "../components/AddTimer";

// Give component chakra props
export const CloseIcon = chakra(GrClose);
const HomeIcon = chakra(AiFillHome);
const TrashIcon = chakra(IoMdTrash);
export const TimerIcon = chakra(MdTimer);

const CreateQuiz = () => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState<string[]>([]);
  const [questionInputvalue, setQuestionInputValue] = useState("");
  const [optionsInputvalue, setOptionsInputValue] = useState("");
  const [radioValue, setRadioValue] = useState<string | number>("");
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Flex
      direction="column"
      minH="100vh"
      align="center"
      justify="center"
      py={12}
      px={4}
    >
      <Box maxW="600px">
        <Header />
        <Flex
          direction="column"
          bg="blackAlpha.200"
          borderLeft="7px solid"
          borderColor="appPurple.600"
          rounded="2xl"
          pt={4}
          px={6}
          pb={1}
          mt={7}
        >
          <Box
            bg="whiteAlpha.700"
            borderRadius="lg"
            pt={4}
            pr={4}
            pl={2}
            pb={2}
            mb={4}
          >
            <Input
              variant="flushed"
              placeholder="Input Question"
              borderColor="gray.600"
              _placeholder={{
                color: "gray.600",
                opacity: 1,
              }}
              value={questionInputvalue}
              onChange={e => setQuestionInputValue(e.target.value)}
              onKeyUp={e => {
                if (e.key === "Enter" || e.code === "13") {
                  e.preventDefault();
                  setQuestionInputValue("");
                  setQuestion(questionInputvalue);
                }
              }}
            />
          </Box>
          <Text mb={4} fontWeight="medium" fontSize="lg" wordBreak="break-word">
            {question}
          </Text>
          <RadioGroup onChange={setRadioValue} value={radioValue}>
            <VStack align="flex-start">
              {options.map((option, i) => (
                <Radio
                  key={i}
                  colorScheme="appPurple"
                  borderColor="appPurple.500"
                  value={(i + 1).toString()}
                >
                  {option}
                </Radio>
              ))}
            </VStack>
          </RadioGroup>
          <InputGroup>
            <Input
              variant="flushed"
              placeholder="Add option"
              borderColor="gray.600"
              _placeholder={{
                color: "gray.600",
                opacity: 1,
              }}
              value={optionsInputvalue}
              onChange={e => setOptionsInputValue(e.target.value)}
              onKeyUp={e => {
                if (
                  (e.key === "Enter" || e.code === "13") &&
                  options.length < 4
                ) {
                  e.preventDefault();
                  setOptions(prev => [...prev, optionsInputvalue]);
                  setOptionsInputValue("");
                }
                if (
                  (e.key === "Enter" || e.code === "13") &&
                  options.length === 4
                ) {
                  e.preventDefault();
                  setOptionsInputValue("");
                  toast({
                    title: "You cannot add more than 4 options",
                    //   description: "We've created your account for you.",
                    status: "warning",
                    duration: 1500,
                    isClosable: true,
                  });
                }
              }}
            />
            <InputRightElement
              children={
                optionsInputvalue && (
                  <CloseIcon
                    color="appPurple.400"
                    fontSize={14}
                    cursor="pointer"
                    onClick={() => setOptionsInputValue("")}
                  />
                )
              }
            />
          </InputGroup>
          <Button
            bg="white"
            _hover={{ bg: "gray.100" }}
            _active={{ bg: "gray.200" }}
            borderRadius="lg"
            boxShadow="md"
            alignSelf="flex-end"
            mt={3}
            mb={5}
          >
            Submit
          </Button>
          <Stack
            direction={["column", "row"]}
            w={["100%", null]}
            borderTop="1px solid"
            borderColor="blackAlpha.600"
            p={1}
            alignSelf="center"
            align={["center", null]}
            justify={[null, "center"]}
            divider={
              <StackDivider
                style={{ borderLeftWidth: "2px" }}
                borderColor="blackAlpha.500"
              />
            }
          >
            <Button
              variant="link"
              color="grey"
              _hover={{
                color: "appPurple.500",
                ".icons": {
                  color: "appPurple.500",
                },
              }}
              transition="none"
              flexDirection="column"
              alignItems="center"
              textAlign="center"
              w={24}
            >
              <HomeIcon fontSize="1.7rem" color="grey" className="icons" />
              <Text>All Questions</Text>
            </Button>
            <Button
              variant="link"
              color="grey"
              _hover={{
                color: "appPurple.500",
                ".icons": {
                  color: "appPurple.500",
                },
              }}
              transition="none"
              flexDirection="column"
              alignItems="center"
              textAlign="center"
              w={24}
              onClick={() => {
                setQuestion("");
                setOptions([]);
              }}
            >
              <TrashIcon fontSize="1.7rem" color="grey" className="icons" />
              <Text>Reset</Text>
            </Button>
            <Button
              variant="link"
              color="grey"
              _hover={{
                color: "appPurple.500",
                ".icons": {
                  color: "appPurple.500",
                },
              }}
              transition="none"
              flexDirection="column"
              alignItems="center"
              textAlign="center"
              w={24}
              onClick={onOpen}
            >
              <TimerIcon fontSize="1.7rem" color="grey" className="icons" />
              <Text>Set Timer</Text>
            </Button>
          </Stack>
          <AddTimer isOpen={isOpen} onClose={onClose} />
        </Flex>
      </Box>
    </Flex>
  );
};

export default CreateQuiz;
