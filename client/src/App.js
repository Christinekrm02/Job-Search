import { useState } from "react";
import AppContext from "./context/AppContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

import LoginForm from "./components/LoginForm";
import SignUpForm from "./components/SignUpForm";
import Home from "./components/Home";
import NavigationComponent from "./components/NavigationBar";
import UserProfile from "./components/UserProfile";
import NoMatch404Error from "./components/NoMatch404Error";

function App() {
  const [user, setUser] = useState({});
  return (
    <div className="App">
      <Router>
        <NavigationComponent />
        <Switch>
          <AppContext.Provider value={{ user, setUser }}>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={LoginForm} />
            <Route path="/signup" component={SignUpForm} />
            <Route exact path="/profile/:slug" component={UserProfile} />
            <Route path="/not-found" component={NoMatch404Error} />
          </AppContext.Provider>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
