import { Flex, Button, chakra, Divider, HStack, Text } from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { Header, Question, Container, Spinner } from "../components";
import { logout } from "../redux/features/user/userSlice";
import { history } from "../utils";
import { useEffect, useState } from "react";
import { QuestionType } from "../redux/features/quiz/quizSlice";
import { BiArrowBack } from "react-icons/bi";

// Give component chakra props
const BackArrow = chakra(BiArrowBack);

const Questions = () => {
  const questions = useAppSelector(state => state.quiz.quiz.questions);
  const isLoading = useAppSelector(state => state.quiz.isLoading);
  const dispatch = useAppDispatch();

  const questionsPerPage = 4;
  const totalPages =
    questions && Math.ceil(questions.length / questionsPerPage);

  const [currentPage, setCurrentPage] = useState(1);
  const [currentQuestions, setCurrentQuestions] = useState<QuestionType[]>([]);

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
    setCurrentPage(prev => prev + 1);
  };
  const handlePrevClick = () => {
    setCurrentPage(prev => prev - 1);
  };

  return (
    <Container>
      <Flex justify="space-between" mb={6}>
        <Button
          onClick={() => {
            dispatch(logout());
          }}
        >
          Logout
        </Button>
        <Button
          onClick={() => {
            history.push("/create-question");
          }}
        >
          Add Question
        </Button>
      </Flex>
      {currentPage > 1 && (
        <Button variant="link" mb={6} onClick={handlePrevClick}>
          <BackArrow color="appPurple.500" mr={2} fontSize="lg" />
          Back
        </Button>
      )}
      <Header />
      {(isLoading || currentQuestions.length === 0) && <Spinner />}
      {currentQuestions.map(question => (
        <Question key={question.id} question={question} />
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
              {currentPage !== totalPages && (
                <Divider
                  orientation="vertical"
                  border="2px solid"
                  borderColor="blackAlpha.300"
                />
              )}
            </>
          )}
          {currentPage !== totalPages && (
            <Button
              variant="link"
              fontWeight="semibold"
              color="appPurple.500"
              onClick={handleNextClick}
            >
              Next
            </Button>
          )}
        </HStack>
      </Flex>
    </Container>
  );
};

export default Questions;
