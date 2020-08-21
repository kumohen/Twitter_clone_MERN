import React from "react";

import { Router, Route, Switch } from "react-router-dom";
import createHistory from "./component/history";
import Login from "./component/authComponent/Login";
import Register from "./component/authComponent/Register";
import Main from "./component/Main";
import Profile from "./component/Profile";
import Userprofile from "./component/Userprofile";
import Single from "./component/Single";
import FirstPage from "./component/authComponent/FirstPage";

const App = () => {
  return (
    <div ui container>
      <Router history={createHistory}>
        <div>
          <Switch>
            <Route exact path="/home" component={Main} />

            <Route exact path="/" component={Login} />
            <Route exact path="/landing" component={FirstPage} />
            <Route exact path="/signup" component={Register} />
            <Route exact path="/profile" component={Profile} />
            <Route path="/profile/:id" component={Userprofile} />
            <Route path="/tweet/:id" component={Single} />
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default App;
