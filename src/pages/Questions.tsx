import { Flex, Spinner, Button } from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { Header, Question, Container } from "../components";
import { logout } from "../redux/features/user/userSlice";
import { history } from "../utils";

const Questions = () => {
  const questions = useAppSelector((state) => state.quiz.quiz.questions);
  const isLoading = useAppSelector((state) => state.quiz.isLoading);
  const dispatch = useAppDispatch();

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
    </Container>
  );
};

export default Questions;
