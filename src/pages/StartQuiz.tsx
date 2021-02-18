import {
  Box,
  Button,
  chakra,
  Divider,
  Flex,
  HStack,
  Text,
  Spinner,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Header, Question, Timer } from "../components";
import { BiArrowBack } from "react-icons/bi";
import { useSelector } from "react-redux";
import { State } from "../redux/store";
import { QuestionType } from "../redux/features/quiz/quizSlice";

// Give component chakra props
const BackArrow = chakra(BiArrowBack);

const StartQuiz = () => {
  const { questions, totalTime } = useSelector((state: State) => state.quiz);

  // const data = new Array(10);
  // for (let i = 0; i < 10; i++) {
  //   data[i] = i;
  // }
  const questionsPerPage = 4;
  // const totalPages = Math.ceil(data.length / questionsPerPage);
  const totalPages = Math.ceil(questions.length / questionsPerPage);

  const [currentPage, setCurrentPage] = useState(1);
  const [currentQuestions, setCurrentQuestions] = useState<QuestionType[]>([]);

  useEffect(() => {
    const indexOfLastQuestion = currentPage * questionsPerPage;
    const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
    // setCurrentQuestions(data.slice(indexOfFirstQuestion, indexOfLastQuestion));
    setCurrentQuestions(
      questions.slice(indexOfFirstQuestion, indexOfLastQuestion)
    );
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
    <Flex
      direction="column"
      minH="100vh"
      align="center"
      justify="center"
      py={12}
      px={4}
    >
      <Box maxW="540px" w="100%">
        {currentPage > 1 && (
          <Button variant="link" mb={6} onClick={handlePrevClick}>
            <BackArrow color="appPurple.500" mr={2} fontSize="lg" />
            Back
          </Button>
        )}
        <Header />
        <Timer totalTime={totalTime} />
        {currentQuestions.length === 0 && (
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
            <Button variant="link">Submit</Button>
          </HStack>
        </Flex>
      </Box>
    </Flex>
  );
};

export default StartQuiz;
