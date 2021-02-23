import { Box, Flex, Text, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { secondsToTimeString } from "../utils";

type Props = {
  totalTime: number;
  submit: () => Promise<void>;
};

const Timer = ({ totalTime, submit }: Props) => {
  const toast = useToast();

  const [seconds, setSeconds] = useState(1);
  const [minutes, setMinutes] = useState(1);
  const [hours, setHours] = useState(1);

  useEffect(() => {
    const totalTimeString = secondsToTimeString(totalTime);
    const timeStringArray = totalTimeString.split(":");
    setSeconds(+timeStringArray[2]);
    setMinutes(+timeStringArray[1]);
    setHours(+timeStringArray[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalTime]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) setSeconds(prevSeconds => prevSeconds - 1);
      if (seconds === 0) {
        if (minutes === 0) {
          if (hours === 0) {
            clearInterval(interval);
          } else {
            setSeconds(59);
            setMinutes(59);
            setHours(prevHours => prevHours - 1);
          }
        } else {
          setSeconds(59);
          setMinutes(prevMinutes => prevMinutes - 1);
        }
      }
    }, 1000);
    return () => clearInterval(interval);
  });

  useEffect(() => {
    if (seconds === 0) {
      if (minutes === 0) {
        if (hours === 0) {
          submit();
          toast({
            title: "Time's up, question submitted",
            status: "warning",
            duration: 2500,
            isClosable: true,
            position: "top",
          });
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seconds, minutes, hours]);

  useEffect(() => {
    if (hours === 0 && minutes === 1 && seconds === 0) {
      toast({
        title: "Test will automatically submit in 1 minute",
        status: "warning",
        duration: 2500,
        isClosable: true,
        position: "top",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seconds, minutes, hours]);

  return (
    <Box mt={5}>
      <Flex
        fontSize="4xl"
        fontWeight="medium"
        justify="center"
        color={
          hours === 0 && minutes === 0 && seconds > 0
            ? "red"
            : hours === 0 && minutes === 0 && seconds === 0
            ? "black"
            : "black"
        }
      >
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
