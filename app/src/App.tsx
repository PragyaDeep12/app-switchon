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
import store from "./Reducer/Store";
import User from "./Models/User";
import { isUndefined } from "util";
import { updateUser, getCurrentUser } from "./Actions/UserActions";
import PendingRequestList from "./Components/PendingRequestList";
function App(props: any) {
  // const onCreateUser = (e: any) => {
  //   props.onCreateUser({ user: { userName: e.target.value } });
  // };
  var loadScript = (src: any, integre?: any, co?: any) => {
    var tag = document.createElement("script");
    // tag.async = true;
    tag.src = src;
    // tag.integrity = integre;
    // tag.crossOrigin = co;
    var body = document.getElementsByTagName("body")[0];
    body.appendChild(tag);
  };
  useEffect(() => {
    loadScript(
      "https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.js"
      // ,
      // "sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl",
      // "anonymous"
    );
    loadScript(
      "https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js"
      // ,
      // "sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q",
      // "anonymous"
    );
    loadScript(
      "https://code.jquery.com/jquery-3.2.1.slim.min.js"
      // ,
      // "sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN",
      // "anonymous"
    );
  }, []);

  return (
    <div className="App" id="app-id">
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
                component={PendingRequestList}
              />
              <PrivateRoute
                path="/pending/:id"
                exact={true}
                component={PendingRequestList}
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
  var lsUser = localStorage.getItem("user");
  if (lsUser != null) {
    //present login details
    setUserDetails(JSON.parse(lsUser));
    setLoginDetails({ isLoggedIn: true });
  } else {
  }
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
  var user = getCurrentUser();
  var lsUser = localStorage.getItem("user");
  if (user !== undefined && user && user.name != null) {
    //user isnt emty
    console.log(user);
  } else {
    //user is empty in store check local storage
    console.log("user is empty in store check local storage");
    if (lsUser !== null) {
      //if the user is in localStorage
      console.log("if the user is in localStorage");
      var tempUser = JSON.parse(lsUser) as User;
      if (tempUser as User) {
        setUserDetails(tempUser);
      }
      if (loginInfo.isLoggedIn === null) {
        //we will save it to store
        setLoginDetails({ isLoggedIn: true });
      }
    } else {
      if (loginInfo.isLoggedIn === null) setLoginDetails({ isLoggedIn: false });
    }
  }

  store.subscribe(() => {
    console.log("updated");
    // console.log(store.getState().user);
    // user = store.getState().user as User;
    console.log(loginInfo);
    if (getCurrentUser() === null) {
      setLoginDetails({ isLoggedIn: false });
    }
  });
  if (
    loginInfo.isLoggedIn === false &&
    (user === null || user.name === undefined)
  )
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
