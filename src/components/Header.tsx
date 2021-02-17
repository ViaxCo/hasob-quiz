import { Box, Heading, Text } from "@chakra-ui/react";
const Header = () => {
  return (
    <Box
      bg="blackAlpha.200"
      borderTop="7px solid"
      borderColor="appPurple.600"
      rounded="2xl"
      p={4}
    >
      <Heading as="h1" color="appPurple.600">
        Quiz Name
      </Heading>
      <Text fontSize="lg">
        Give a short description of the name and purpose of the quiz
      </Text>
    </Box>
  );
};

export default Header;
