/**
 * Convert seconds to time in hours, minutes and seconds
 * @example
 *  secondsToTimeString(90) // "00:01:30"
 * @param seconds
 */
export default function secondsToTimeString(seconds: number) {
  return new Date(seconds * 1000).toISOString().substr(11, 8);
}
