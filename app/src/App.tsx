import React, { FormEvent } from "react";
import { Component } from "react";
import { useContext, useEffect } from "react";
import "./App.css";
import "./Styles/stylesheet.css";
import "./Styles/bootstrap.css";
import LoginProvider from "./Context/LoginProvider";
import CustomSnackbar from "./Components/CustomSnackBar";
import { connect, Provider } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import LoginContext from "./Context/LoginContext";
import Home from "./Pages/Home";
import LoginSignup from "./Pages/LoginSignup";
import Loading from "./Pages/Loading";
import { createUser } from "./Actions/UserActions";
import { createStore, combineReducers } from "redux";
import userReducer from "./Reducer/UserReducer";
import requestReducer from "./Reducer/RequestsReducer";
import store from "./Reducer/Store";
import PendingRequestList from "./Components/PendingRequestList";
import WaitingList from "./Components/WaitingList";
import ApprovedList from "./Components/ApprovedList";
import RequestForm from "./Components/RequestForm";
function App(props: any) {
  // const onCreateUser = (e: any) => {
  //   props.onCreateUser({ user: { userName: e.target.value } });
  // };
  return (
    <div className="App">
      <Provider store={store}>
        <LoginProvider>
          <CustomSnackbar />
          <Router>
            <Switch>
              <Route
                path="/"
                exact={true}
                render={props => <LoginWrapper page="signup" />}
              />
              <Route
                path="/login"
                exact={true}
                render={props => <LoginWrapper page="login" />}
              />
              <PrivateRoute
                path="/requestform"
                page="form"
                component={() => {
                  return <Home page="form" />;
                }}
              />
              <PrivateRoute
                path="/pending"
                exact={true}
                component={() => {
                  return <Home page="pending" />;
                }}
              />
              <PrivateRoute
                path="/approved"
                exact={true}
                component={() => {
                  return <Home page="approved" />;
                }}
              />
              <PrivateRoute
                path="/waitinglist"
                exact={true}
                component={() => {
                  return <Home page="waitinglist" />;
                }}
              />
            </Switch>
          </Router>
        </LoginProvider>
      </Provider>
    </div>
  );
}
export default App;
function LoginWrapper(props: any) {
  const {
    state: { loginInfo },
    actions: { setUserDetails, setLoginDetails, logout }
  }: any = useContext(LoginContext);
  let isMounted = false;
  useEffect(() => {
    if (!isMounted) {
      isMounted = true;
      var user = localStorage.getItem("user");
      if (user) {
        // console.log(JSON.parse(user));
        console.log(JSON.parse(user));
        setUserDetails(JSON.parse(user));
        setLoginDetails({ isLoggedIn: true });
      } else {
        setLoginDetails({ isLoggedIn: false });
      }
    }
  }, []);
  console.log(loginInfo);
  if (loginInfo && loginInfo.isLoggedIn === true) {
    return <Redirect to="/requestform" />;
  }
  if (loginInfo.isLoggedIn === false) {
    return <LoginSignup page={props.page} />;
  }
  return <Loading />;
}
// }
function PrivateRoute({ Component, ...rest }: any) {
  const {
    state: { loginInfo },
    actions: { setUserDetails, setLoginDetails, logout }
  }: any = useContext(LoginContext);
  var user = localStorage.getItem("user");
  if (user !== null) {
    setUserDetails(JSON.parse(user));
    console.log(rest);
    // setLoginDetails({ isLoggedIn: true, user: JSON.parse(user) });
  } else {
    setLoginDetails({ isLoggedIn: false });
  }

  return (
    <Route
      {...rest}
      render={props => {
        if (loginInfo.isLoggedIn === false) {
          return <Redirect to="/login" />;
        } else if (loginInfo.isLoggedIn === null) return <Loading />;

        return <Component {...props} />;
      }}
    />
  );
}
