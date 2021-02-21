import { Box, Text, Radio, RadioGroup, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useAppSelector } from "../redux/hooks";
import { QuestionType } from "../redux/features/quiz/quizSlice";
import { UserAnswer } from "../pages/StartQuiz";

type Props = {
  question: QuestionType;
  setCurrentAnswer?: (currentAnswer: UserAnswer) => void;
  userAnswers?: UserAnswer[];
};

const Question = ({ question, setCurrentAnswer, userAnswers }: Props) => {
  const { isAuthenticated, role } = useAppSelector((state) => state.user);
  const correctAnswerObj = question.answers.find(
    (answer) => answer.correct === true
  );
  const correctAnswer = correctAnswerObj?.answer;

  const [value, setValue] = useState<string | number>(
    isAuthenticated && role === "Admin" ? correctAnswer! : ""
  );

  useEffect(() => {
    if (isAuthenticated && role === "User") {
      const currentAnswer = userAnswers!.find(
        (answer) => answer.questionId === question.id
      );
      if (currentAnswer) {
        const selectedAnswer = question.answers.find(
          (answer) => answer.id === currentAnswer.selectedAnswer
        );
        if (selectedAnswer) setValue(selectedAnswer.answer);
      }
    }
  }, [question, userAnswers, isAuthenticated, role]);

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
      <RadioGroup
        onChange={
          isAuthenticated && role === "User"
            ? (value) => setValue(value)
            : undefined
        }
        value={value}
      >
        <VStack align="flex-start">
          {question.answers.map((answer) => (
            <Radio
              key={answer.id}
              colorScheme="appPurple"
              borderColor="appPurple.500"
              onChange={
                isAuthenticated && role === "User"
                  ? (e) => {
                      setCurrentAnswer!({
                        questionId: answer.questionId!,
                        selectedAnswer: answer.id!
                      });
                    }
                  : undefined
              }
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
