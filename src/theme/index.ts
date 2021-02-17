import { extendTheme } from "@chakra-ui/react";

// Global style overrides
import styles from "./styles";

// Foundational style overrides
import colors from "./foundations/colors";

const overrides = {
  styles,
  colors,
  fonts: {
    heading: "'Quicksand', sans-serif",
    body: "'Quicksand', sans-serif",
  },
};

export default extendTheme(overrides);
