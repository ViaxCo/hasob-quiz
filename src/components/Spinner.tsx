import { Spinner as ChakraSpinner } from "@chakra-ui/react";

type Props = {
  top?: string;
};

const Spinner = ({ top }: Props) => {
  return (
    <ChakraSpinner
      color="appPurple.500"
      size="xl"
      thickness="4px"
      position="absolute"
      top={top ? top : "25%"}
      left="0"
      bottom="0"
      right="0"
      margin="auto"
    />
  );
};

export default Spinner;
