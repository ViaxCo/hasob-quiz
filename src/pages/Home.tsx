import { Box, Flex, Heading, Text, Link, Button } from "@chakra-ui/react";
import { Header, Container, Spinner } from "../components";
import { Link as RouterLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { logout } from "../redux/features/user/userSlice";
import { history, secondsToTimeString } from "../utils";
import { useEffect, useState } from "react";

const Home = () => {
  const isAuthenticated = useAppSelector(state => state.user.isAuthenticated);
  const isLoading = useAppSelector(state => state.quiz.isLoading);
  const { totalQuestions, totalTime } = useAppSelector(
    state => state.quiz.quiz
  );
  const dispatch = useAppDispatch();

  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);

  useEffect(() => {
    if (totalTime) {
      const totalTimeString = secondsToTimeString(totalTime);
      const timeStringArray = totalTimeString.split(":");
      setSeconds(+timeStringArray[2]);
      setMinutes(+timeStringArray[1]);
      setHours(+timeStringArray[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalTime]);
  return (
    <Container>
      {isAuthenticated ? (
        <Button
          mb={6}
          onClick={() => {
            dispatch(logout());
          }}
        >
          Logout
        </Button>
      ) : (
        <Flex justify="space-between" mb={6}>
          <Button
            onClick={() => {
              history.push("/login");
            }}
          >
            Login
          </Button>
          <Button
            onClick={() => {
              history.push("/signup");
            }}
          >
            Sign Up
          </Button>
        </Flex>
      )}
      <Header />
      {isLoading ? (
        <Spinner top="50%" />
      ) : (
        <Box
          bg="blackAlpha.200"
          borderLeft="7px solid"
          borderColor="appPurple.600"
          rounded="2xl"
          p={6}
          mt={10}
          textAlign="center"
        >
          {isLoading === false && isAuthenticated && totalQuestions ? (
            <>
              <Link
                as={RouterLink}
                to="/start-quiz"
                _hover={{ textDecoration: "none" }}
              >
                <Heading
                  textDecoration="underline"
                  fontSize="3xl"
                  color="appPurple.500"
                  mb={4}
                >
                  Start Quiz
                </Heading>
              </Link>
              <Text>
                This is a timed quiz consisting of{" "}
                <b>{totalQuestions} questions.</b>
                <br />
                You are required to complete the quiz within{" "}
                <b>
                  {hours > 0
                    ? hours === 1
                      ? `${hours} hour`
                      : `${hours} hours`
                    : null}{" "}
                  {minutes > 0
                    ? minutes === 1
                      ? `${minutes} minute`
                      : `${minutes} minutes`
                    : null}{" "}
                  {seconds > 0
                    ? seconds === 1
                      ? `${seconds} second`
                      : `${seconds} seconds`
                    : null}
                </b>{" "}
                before the page times off.
                <br />
                If you fail to complete the quiz before the allotted time,the
                quiz will time off at the end of the allotted time, thereby
                ending the quiz abrubtly and rendering your attempt invalid.
                <br />
                <br />
                When you are ready, click on the <b>"Start Quiz"</b> link above
                to commence the quiz.
                <br />
                Good luck!
              </Text>
            </>
          ) : (
            <Text>No questions</Text>
          )}
        </Box>
      )}
    </Container>
  );
};

export default Home;
