/**
 * Capitalize the first letter of the passed string value
 * @param value
 */
export default function capitalizeFirstLetter(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}
