/**
 * Convert time in hours, seconds and minutes to seconds
 * @example
 *  timeStringToSeconds("00:01:30") // 90
 * @param timeString
 */
export default function timeStringToSeconds(timeString: string) {
  const x = timeString.split(":");
  // x would look like this: ["00","00","00"]
  const hoursToSeconds = +x[0] * 60 * 60;
  const minutesToSeconds = +x[1] * 60;
  const seconds = hoursToSeconds + minutesToSeconds + +x[2];
  return seconds;
}
