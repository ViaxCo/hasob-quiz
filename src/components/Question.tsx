import { Box, Text, Radio, RadioGroup, VStack } from "@chakra-ui/react";
import { useState } from "react";

type Props = { n: number };

const Question = ({ n }: Props) => {
  const [value, setValue] = useState<string | number>("");
  return (
    <Box
      bg="blackAlpha.200"
      borderLeft="7px solid"
      borderColor="appPurple.600"
      rounded="2xl"
      p={6}
      mt={7}
    >
      <Box
        bg="whiteAlpha.700"
        borderRadius="lg"
        pt={4}
        pr={4}
        pl={2}
        pb={2}
        mb={4}
      >
        <Text fontWeight="medium" borderBottom="1px solid gray">
          {n}. This is a timed quiz consisting of 10 questions.
        </Text>
      </Box>
      <RadioGroup onChange={setValue} value={value}>
        <VStack align="flex-start">
          <Radio colorScheme="appPurple" borderColor="appPurple.500" value="1">
            Lorem
          </Radio>
          <Radio colorScheme="appPurple" borderColor="appPurple.500" value="2">
            Ipsum
          </Radio>
          <Radio colorScheme="appPurple" borderColor="appPurple.500" value="3">
            Reggie
          </Radio>
          <Radio colorScheme="appPurple" borderColor="appPurple.500" value="4">
            Arnold
          </Radio>
        </VStack>
      </RadioGroup>
    </Box>
  );
};

export default Question;
