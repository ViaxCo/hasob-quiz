import { Box, Heading, Text, useToast } from "@chakra-ui/react";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { getQuiz } from "../redux/features/quiz/quizSlice";
import { unwrapResult } from "@reduxjs/toolkit";

const Header = () => {
  const { title, description } = useAppSelector((state) => state.quiz.quiz);
  const isLoading = useAppSelector((state) => state.quiz.isLoading);
  const isAuthenticated = useAppSelector((state) => state.user.isAuthenticated);
  const dispatch = useAppDispatch();
  const toast = useToast();

  useEffect(() => {
    if (isAuthenticated && isLoading === null)
      dispatch(getQuiz())
        .then(unwrapResult)
        .catch((error) => {
          console.log(error);
          toast({
            title: "An error occurred",
            status: "error",
            duration: 2500,
            isClosable: true,
            position: "top"
          });
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
