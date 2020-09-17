import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import ARegister from "./components/auth/ARegister";
import ALogin from "./components/auth/ALogin";
import Login from "./components/auth/Login";
import Dashboard from "./components/dashboard/Dashboard";
import PrivateRoute from "./components/common/PrivateRoute";
import AdminDashboard from "./components/dashboard/AdminDashboard";
import AddUser from "./components/dashboard/AddUser";
import VerifyUser from "./components/dashboard/VerifyUser";
import "./App.css";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />

            <Route exact path="/" component={Landing} />

            <div className="container">
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />

              <Route exact path="/aregister" component={ARegister} />
              <Route exact path="/alogin" component={ALogin} />
              <Switch>
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/adashboard"
                  component={AdminDashboard}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/add-user-details"
                  component={AddUser}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/verify-user"
                  component={VerifyUser}
                />
              </Switch>
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}
export default App;
