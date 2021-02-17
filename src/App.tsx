import { HashRouter as Router, Route, Switch } from "react-router-dom";
import CreateQuiz from "./pages/CreateQuiz";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import StartQuiz from "./pages/StartQuiz";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route path="/start-quiz">
          <StartQuiz />
        </Route>
        <Route path="/create-quiz">
          <CreateQuiz />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
