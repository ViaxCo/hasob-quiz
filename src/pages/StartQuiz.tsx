import {
  Button,
  chakra,
  Divider,
  Flex,
  HStack,
  Text,
  Spinner,
  Heading,
  useToast,
  useDisclosure
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {
  Header,
  Question,
  Timer,
  SubmittingOverlay,
  Container
} from "../components";
import { BiArrowBack } from "react-icons/bi";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { QuestionType, submitQuiz } from "../redux/features/quiz/quizSlice";
import { unwrapResult } from "@reduxjs/toolkit";

export interface UserAnswer {
  questionId: number;
  selectedAnswer: number;
}

// Give component chakra props
const BackArrow = chakra(BiArrowBack);

const StartQuiz = () => {
  const { questions, totalQuestions, totalTime } = useAppSelector(
    (state) => state.quiz.quiz
  );
  const isLoading = useAppSelector((state) => state.quiz.isLoading);
  const toast = useToast();
  const dispatch = useAppDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const questionsPerPage = 4;
  const totalPages =
    questions && Math.ceil(questions.length / questionsPerPage);

  const [currentPage, setCurrentPage] = useState(1);
  const [currentQuestions, setCurrentQuestions] = useState<QuestionType[]>([]);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);

  useEffect(() => {
    const indexOfLastQuestion = currentPage * questionsPerPage;
    const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
    if (questions) {
      setCurrentQuestions(
        questions.slice(indexOfFirstQuestion, indexOfLastQuestion)
      );
    }
    window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, questions]);

  const handleNextClick = () => {
    setCurrentPage((prev) => prev + 1);
  };
  const handlePrevClick = () => {
    setCurrentPage((prev) => prev - 1);
  };

  const setCurrentAnswer = (currentAnswer: UserAnswer) => {
    const answer = userAnswers.find(
      (userAnswer) => userAnswer.questionId === currentAnswer.questionId
    );
    if (answer) {
      setUserAnswers((prevUserAnswers) =>
        prevUserAnswers.map((prevUserAnswer) =>
          prevUserAnswer.questionId === currentAnswer.questionId
            ? {
                ...prevUserAnswer,
                selectedAnswer: currentAnswer.selectedAnswer
              }
            : prevUserAnswer
        )
      );
    } else {
      setUserAnswers((prevUserAnswers) => [...prevUserAnswers, currentAnswer]);
    }
  };

  const submit = async () => {
    onOpen();
    try {
      const res = await dispatch(
        submitQuiz({ userAnswers, quizId: questions![0].quizId! })
      );
      unwrapResult(res);
      const correctCount = res.payload;
      onClose();
      toast({
        title: "Submitted!",
        description: `You answered correctly: ${correctCount}/${totalQuestions}`,
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top"
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "An error occurred",
        status: "error",
        duration: 2500,
        isClosable: true,
        position: "top"
      });
      onClose();
    }
  };

  const handleSubmit = () => {
    if (userAnswers.length < totalQuestions!) {
      toast({
        title: "Please answer all questions before submitting",
        status: "warning",
        duration: 2500,
        isClosable: true,
        position: "top"
      });
    } else {
      submit();
    }
  };

  return (
    <Container>
      {currentPage > 1 && (
        <Button variant="link" mb={6} onClick={handlePrevClick}>
          <BackArrow color="appPurple.500" mr={2} fontSize="lg" />
          Back
        </Button>
      )}
      <Header />
      {currentQuestions.length > 0 && (
        <Timer totalTime={totalTime} submit={submit} />
      )}
      {currentQuestions.length > 0 && totalQuestions && (
        <Heading as="h4" mt={5} textAlign="center" fontSize="medium">
          Total questions: {totalQuestions}
        </Heading>
      )}
      {(isLoading || currentQuestions.length === 0) && (
        <Spinner
          color="appPurple.500"
          size="xl"
          thickness="4px"
          position="absolute"
          top="25%"
          left="0"
          bottom="0"
          right="0"
          margin="auto"
        />
      )}
      {currentQuestions.map((question) => (
        <Question
          key={question.id}
          question={question}
          setCurrentAnswer={setCurrentAnswer}
          userAnswers={userAnswers}
        />
      ))}
      <Flex justify="space-between" mt={24}>
        <Text fontWeight="semibold">
          Page {currentPage} of {totalPages}
        </Text>
        <HStack>
          {currentPage > 1 && (
            <>
              <Button
                variant="link"
                fontWeight="semibold"
                color="appPurple.500"
                onClick={handlePrevClick}
              >
                Prev
              </Button>
              <Divider
                orientation="vertical"
                border="2px solid"
                borderColor="blackAlpha.300"
              />
            </>
          )}
          {currentPage !== totalPages && (
            <>
              <Button
                variant="link"
                fontWeight="semibold"
                color="appPurple.500"
                onClick={handleNextClick}
              >
                Next
              </Button>
              <Divider
                orientation="vertical"
                border="2px solid"
                borderColor="blackAlpha.300"
              />
            </>
          )}
          <Button variant="link" onClick={handleSubmit}>
            Submit
          </Button>
          <SubmittingOverlay isOpen={isOpen} onClose={onClose} />
        </HStack>
      </Flex>
    </Container>
  );
};

export default StartQuiz;
