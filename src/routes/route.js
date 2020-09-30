import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {
  Dashboard,
  CreateBlog,
  ViewBlog,
  Signup,
  Login,
  ViewAllDashboard,
  EditProfile,
  EditBlog
} from "../container/index";

class Routes extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/viewAll" component={ViewAllDashboard} />
          <Route exact path="/createBlog" component={CreateBlog} />
          <Route exact path="/viewBlog/:id" component={ViewBlog} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/editProfile" component={EditProfile} />
          <Route exact path="/editBlog" component={EditBlog} />
        </Switch>
      </Router>
    );
  }
}

export default Routes;
