import { Box, Text, Radio, RadioGroup, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { QuestionType } from "../redux/features/quiz/quizSlice";
import { State } from "../redux/store";

type Props = { n?: number; question?: QuestionType };

const Question = ({ n, question }: Props) => {
  const { isAuthenticated, role } = useSelector((state: State) => state.user);
  const correctAnswerObj = question?.answers.find(
    answer => answer.correct === true
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
          {question
            ? question.question
            : `${n}. This is a timed quiz consisting of 10 questions.`}
        </Text>
      </Box>
      <RadioGroup onChange={setValue} value={value}>
        <VStack align="flex-start">
          {question ? (
            question.answers.map(answer => (
              <Radio
                key={answer.id}
                colorScheme="appPurple"
                borderColor="appPurple.500"
                value={answer.answer}
              >
                {answer.answer}
              </Radio>
            ))
          ) : (
            <>
              <Radio
                colorScheme="appPurple"
                borderColor="appPurple.500"
                value="1"
              >
                Lorem
              </Radio>
              <Radio
                colorScheme="appPurple"
                borderColor="appPurple.500"
                value="2"
              >
                Ipsum
              </Radio>
              <Radio
                colorScheme="appPurple"
                borderColor="appPurple.500"
                value="3"
              >
                Reggie
              </Radio>
              <Radio
                colorScheme="appPurple"
                borderColor="appPurple.500"
                value="4"
              >
                Arnold
              </Radio>
            </>
          )}
        </VStack>
      </RadioGroup>
    </Box>
  );
};

export default Question;
