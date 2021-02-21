import { Box, Flex } from "@chakra-ui/react";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const Container = ({ children }: Props) => {
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
        {children}
      </Box>
    </Flex>
  );
};

export default Container;
