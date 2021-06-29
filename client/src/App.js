import React from "react";
import { BrowserRouter as Router, Switch, Route, Link  } from 'react-router-dom'
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import Home from "./components/home.component";
import Login from "./components/login.component";
import SignUp from "./components/signup.component";

function App() {
  return (
    <Router>
      <div className="App">
        <div className="auth-wrapper">
          <div className="auth-inner">
            <Switch>
              <Route exact path='/' component={Home} />
              <Route path="/login" component={Login} />
              <Route path="/sign-up" component={SignUp} />
            </Switch>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
