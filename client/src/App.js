import { useState } from "react";
import AppContext from "./context/AppContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import LoginForm from "./components/LoginForm";
import SignUpForm from "./components/SignUpForm";
import Home from "./components/Home";

function App() {
  const [user, setUser] = useState({});
  return (
    <div className="App">
      <Router>
        <Switch>
          <AppContext.Provider value={{ user, setUser }}>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={LoginForm} />
            <Route path="/signup" component={SignUpForm} />
          </AppContext.Provider>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
