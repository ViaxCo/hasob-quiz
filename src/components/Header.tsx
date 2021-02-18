import { Box, Heading, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { State } from "../redux/store";
const Header = () => {
  const { title, description } = useSelector((state: State) => state.quiz);

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
