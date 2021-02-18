import { useSelector } from "react-redux";
import { Router, Redirect, Route, Switch } from "react-router-dom";
import {
  CreateQuestion,
  Home,
  Login,
  Questions,
  Signup,
  StartQuiz,
} from "./pages";
import { State } from "./redux/store";
import { history } from "./utils";

const App = () => {
  const { isAuthenticated, role } = useSelector((state: State) => state.user);

  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/">
          {isAuthenticated && role === "Admin" ? (
            <Redirect to="/questions" />
          ) : (
            <Home />
          )}
        </Route>
        <Route path="/login">
          {isAuthenticated ? <Redirect to="/" /> : <Login />}
        </Route>
        <Route path="/signup">
          {isAuthenticated ? <Redirect to="/" /> : <Signup />}
        </Route>
        <Route path="/start-quiz">
          {isAuthenticated && role === "User" ? (
            <StartQuiz />
          ) : isAuthenticated && role === "Admin" ? (
            <Redirect to="/" />
          ) : (
            <Redirect to="/login" />
          )}
        </Route>
        <Route path="/create-question">
          {isAuthenticated && role === "Admin" ? (
            <CreateQuestion />
          ) : isAuthenticated && role === "User" ? (
            <Redirect to="/" />
          ) : (
            <Redirect to="/login" />
          )}
        </Route>
        <Route path="/questions">
          {isAuthenticated && role === "Admin" ? (
            <Questions />
          ) : isAuthenticated && role === "User" ? (
            <Redirect to="/" />
          ) : (
            <Redirect to="/login" />
          )}
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
