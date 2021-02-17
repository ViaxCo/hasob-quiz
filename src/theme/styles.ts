const styles = {
  global: {
    //   My resets
    "*, *::before, *::after": {
      boxSizing: "border-box",
    },
    "*": {
      margin: "0",
      padding: "0",
      WebkitTapHighlightColor: "transparent",
    },
    // styles for the `html` and `body`
    "html,body": {
      minWidth: "fit-content",
    },
    ".ant-picker-dropdown": {
      zIndex: "1500",
    },
    ".ant-picker-large .ant-picker-input > input": {
      fontSize: "1.5rem",
    },
  },
};

export default styles;
