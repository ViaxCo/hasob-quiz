import { Box, Flex, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const Timer = () => {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) setSeconds(prevSeconds => prevSeconds - 1);
      if (seconds === 0) {
        if (minutes === 0) {
          if (hours === 0) {
            clearInterval(interval);
          } else {
            setHours(prevHours => prevHours - 1);
            setMinutes(59);
            setSeconds(59);
          }
        } else {
          setMinutes(prevMinutes => prevMinutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => clearInterval(interval);
  });
  return (
    <Box mt={5}>
      <Flex fontSize="4xl" fontWeight="medium" justify="center">
        <Text mr={1}>{hours < 10 ? `0${hours}` : hours}</Text>
        <Text mr={1}>:</Text>
        <Text mr={1}>{minutes < 10 ? `0${minutes}` : minutes}</Text>
        <Text mr={1}>:</Text>
        <Text>{seconds < 10 ? `0${seconds}` : seconds}</Text>
      </Flex>
      <Flex color="appPurple.500" fontSize="lg" justify="center">
        <Text mr={4}>Hours</Text>
        <Text mr={4}>Mins</Text>
        <Text>Secs</Text>
      </Flex>
    </Box>
  );
};

export default Timer;
