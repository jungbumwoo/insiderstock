import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./container/Home/Home";
import Signin from "../src/container/Signin/Signin.js";
import Signup from "../src/container/Signup/Signup.js";
import GetToken from "../src/container/GetToken/GetToken.js";
import Signout from "../src/container/Signout/Signout.js";
import Onboard from "../src/container/Onboard/Onboard.js";
import Interest from "./container/Interest/Interest";

function App() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/signin" component={Signin} />
      <Route path="/signup" component={Signup} />
      <Route path="/signout" component={Signout} />
      <Route path="/onboard" component={Onboard} />
      <Route path="/interest" component={Interest} />
      <Route path="/:token" component={GetToken} />
    </Switch>
  );
}

export default App;
