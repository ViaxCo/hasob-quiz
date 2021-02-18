import { Box, Flex, Heading, Text, Link, Button } from "@chakra-ui/react";
import { Header } from "../components";
import { Link as RouterLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../redux/store";
import { logout } from "../redux/features/user/userSlice";
import { history } from "../utils";

const Home = () => {
  const { isAuthenticated } = useSelector((state: State) => state.user);
  const dispatch = useDispatch();
  return (
    <Flex direction="column" minH="100vh" align="center" justify="center" p={3}>
      <Box maxW="540px" w="100%">
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
        {isAuthenticated && (
          <Box
            bg="blackAlpha.200"
            borderLeft="7px solid"
            borderColor="appPurple.600"
            rounded="2xl"
            p={6}
            mt={10}
            textAlign="center"
          >
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
              This is a timed quiz consisting of 10 questions.
              <br />
              You are required to complete the quiz within ten(10) minutes
              before the page times off.
              <br />
              If you fail to complete the quiz before the allotted time,the quiz
              will time off at the end of the allotted time, thereby ending the
              quiz abrubtly and rendering your attempt invalid.
              <br />
              <br />
              When you are ready, click on the "Start Quiz" link above to
              commence the quiz.
              <br />
              Good luck!
            </Text>
          </Box>
        )}
      </Box>
    </Flex>
  );
};

export default Home;
