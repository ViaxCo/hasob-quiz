import { Box, Flex, Spinner, Button } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { Header, Question } from "../components";
import { logout } from "../redux/features/user/userSlice";
import { State } from "../redux/store";
import { history } from "../utils";

const Questions = () => {
  const { questions, isLoading } = useSelector((state: State) => state.quiz);
  const dispatch = useDispatch();

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
        {questions.map(question => (
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
