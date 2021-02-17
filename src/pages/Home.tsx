import { Box, Flex, Heading, Text, Link } from "@chakra-ui/react";
import Header from "../components/Header";
import { Link as RouterLink } from "react-router-dom";

const Home = () => {
  return (
    <Flex direction="column" minH="100vh" align="center" justify="center" p={3}>
      <Box maxW="600px">
        <Header />
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
            You are required to complete the quiz within ten(10) minutes before
            the page times off.
            <br />
            If you fail to complete the quiz before the allotted time,the quiz
            will time off at the end of the allotted time, thereby ending the
            quiz abrubtly and rendering your attempt invalid.
            <br />
            <br />
            When you are ready, click on the "Start Quiz" link above to commence
            the quiz.
            <br />
            Good luck!
          </Text>
        </Box>
      </Box>
    </Flex>
  );
};

export default Home;
