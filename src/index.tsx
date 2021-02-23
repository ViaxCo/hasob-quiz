import { StrictMode } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import store from "./redux/store";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme";
// Remove blue outline from buttons and links
import "focus-visible/dist/focus-visible";
import { setAuthToken, setBaseUrl } from "./utils";
import { setCurrentUser } from "./redux/features/user/userSlice";

setBaseUrl("https://hasquiz-api.herokuapp.com/api/");

if (localStorage.jwtToken && localStorage.role) {
  setAuthToken(localStorage.jwtToken);
  store.dispatch(setCurrentUser(localStorage.role));
}

ReactDOM.render(
  <StrictMode>
    <ChakraProvider theme={theme}>
      <Provider store={store}>
        <App />
      </Provider>
    </ChakraProvider>
  </StrictMode>,
  document.getElementById("root")
);
