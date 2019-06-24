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
import User from "./Models/User";
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
  var user = store.getState().user as User;
  store.subscribe(() => {
    console.log("updated");
    user = store.getState().user as User;
  });
  if (user && user.name != null) {
    //already in store because came from login
    console.log(user);
    if (loginInfo.isLoggedIn === true && user) {
      return <Redirect to="/requestform" />;
    }
    if (loginInfo.isLoggedIn === false) {
      return <LoginSignup page={props.page} />;
    }
    return <Loading />;
  } else {
    //not in store
    return <LoginSignup page={props.page} />;
  }
}
function PrivateRoute({ Component, ...rest }: any) {
  const {
    state: { loginInfo },
    actions: { setUserDetails, setLoginDetails, logout }
  }: any = useContext(LoginContext);
  var user = store.getState().user as User;
  var lsUser = localStorage.getItem("user");
  if (lsUser !== null) {
    //if the user is in localStorage
    if (loginInfo.isLoggedIn === null) {
      //we will save it to store
      setUserDetails(JSON.parse(lsUser));
      setLoginDetails({ isLoggedIn: true });
    }
  } else {
    if (loginInfo.isLoggedIn === null) setLoginDetails({ isLoggedIn: false });
  }
  store.subscribe(() => {
    console.log("updated");
    // console.log(store.getState().user);
    user = store.getState().user as User;
    console.log(loginInfo);
    if (user === null) {
      setLoginDetails({ isLoggedIn: false });
    }
  });
  console.log(loginInfo);
  if (loginInfo.isLoggedIn === false && user === null)
    return (
      <Route
        render={props => {
          return <Redirect to="/login" />;
        }}
      />
    );

  return (
    <Route
      {...rest}
      render={props => {
        return <Component {...props} />;
      }}
    />
  );
}
