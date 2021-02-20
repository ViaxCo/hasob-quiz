import { Box, Text, Radio, RadioGroup, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { useAppSelector } from "../redux/hooks";
import { QuestionType } from "../redux/features/quiz/quizSlice";

type Props = { question: QuestionType };

const Question = ({ question }: Props) => {
  const { isAuthenticated, role } = useAppSelector((state) => state.user);
  const correctAnswerObj = question.answers.find(
    (answer) => answer.correct === true
  );
  const correctAnswer = correctAnswerObj?.answer;
  const [value, setValue] = useState<string | number>(
    isAuthenticated && role === "Admin" ? correctAnswer! : ""
  );
  return (
    <Box
      bg="blackAlpha.200"
      borderLeft="7px solid"
      borderColor="appPurple.600"
      rounded="2xl"
      p={6}
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
        <Text fontWeight="medium" fontSize="lg" borderBottom="1px solid gray">
          {question.question}
        </Text>
      </Box>
      <RadioGroup onChange={setValue} value={value}>
        <VStack align="flex-start">
          {question.answers.map((answer) => (
            <Radio
              key={answer.id}
              colorScheme="appPurple"
              borderColor="appPurple.500"
              value={answer.answer}
            >
              {answer.answer}
            </Radio>
          ))}
        </VStack>
      </RadioGroup>
    </Box>
  );
};

export default Question;
