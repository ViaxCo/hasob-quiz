export default function timeStringToSeconds(timeString: string) {
  // timeString should look like this: "00:00:00"
  const x = timeString.split(":");
  // x would look like this: ["00","00","00"]
  const hoursToSeconds = +x[0] * 60 * 60;
  const minutesToSeconds = +x[1] * 60;
  const seconds = hoursToSeconds + minutesToSeconds + +x[2];
  return seconds;
}
