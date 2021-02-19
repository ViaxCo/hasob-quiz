import { Box, Heading, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getQuiz } from "../redux/features/quiz/quizSlice";
import { State } from "../redux/store";
const Header = () => {
  const { title, description, isLoading } = useSelector(
    (state: State) => state.quiz
  );
  const isAuthenticated = useSelector(
    (state: State) => state.user.isAuthenticated
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthenticated && isLoading === null) dispatch(getQuiz());
  }, [dispatch, isLoading, isAuthenticated]);

  return (
    <Box
      bg="blackAlpha.200"
      borderTop="7px solid"
      borderColor="appPurple.600"
      rounded="2xl"
      p={4}
    >
      <Heading as="h1" color="appPurple.600">
        {title ? title : "Quiz Name"}
      </Heading>
      <Text fontSize="lg">
        {description
          ? description
          : "Give a short description of the name and purpose of the quiz"}
      </Text>
    </Box>
  );
};

export default Header;
