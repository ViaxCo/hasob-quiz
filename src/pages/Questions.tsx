import { Box, Flex, Spinner, Button } from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { Header, Question } from "../components";
import { logout } from "../redux/features/user/userSlice";
import { history } from "../utils";

const Questions = () => {
  const { questions } = useAppSelector((state) => state.quiz.quiz);
  const { isLoading } = useAppSelector((state) => state.quiz);
  const dispatch = useAppDispatch();

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
        <Header />
        {questions &&
          questions.map((question) => (
            <Question key={question.id} question={question} />
          ))}
        {isLoading && (
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
        )}
      </Box>
    </Flex>
  );
};

export default Questions;
