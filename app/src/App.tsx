import React, { FormEvent } from "react";
import { Component } from "react";
import { useContext, useEffect } from "react";
import "./App.css";
import "./Styles/stylesheet.css";
import "./Styles/bootstrap.css";
import LoginProvider from "./Context/LoginProvider";
import CustomSnackbar, { openSnackbar } from "./Components/CustomSnackBar";
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
import { socket } from "./Dao/SocketDAO";
import { newRequestArrived } from "./Actions/RequestActions";
function App(props: any) {
  socket.on("newRequestArrived", data => {
    store.dispatch(newRequestArrived(data));
  });

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
                path="/rejected"
                page="rejected"
                component={() => {
                  return <Home page="rejected" />;
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
  var lsUser = localStorage.getItem("user");
  if (lsUser != null) {
    //present login details
    setUserDetails(JSON.parse(lsUser));
    setLoginDetails({ isLoggedIn: true });
  } else {
  }
  store.subscribe(() => {
    // console.log("updated");
    user = store.getState().user as User;
  });
  if (user && user.name != null) {
    //already in store because came from login
    //  console.log(user);
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
    //   console.log(user);
  } else {
    //user is empty in store check local storage
    // console.log("user is empty in store check local storage");
    if (lsUser !== null) {
      //if the user is in localStorage
      //   console.log("if the user is in localStorage");
      var tempUser = JSON.parse(lsUser) as User;
      if (tempUser as User) {
        setUserDetails(tempUser);
      }
      if (loginInfo.isLoggedIn === null) {
        //we will save it to store
        initiateSocketListners();
        setLoginDetails({ isLoggedIn: true });
      }
    } else {
      if (loginInfo.isLoggedIn === null) setLoginDetails({ isLoggedIn: false });
    }
  }

  store.subscribe(() => {
    //   console.log("updated");
    // console.log(store.getState().user);
    // user = store.getState().user as User;
    // console.log(loginInfo);
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
function initiateSocketListners() {
  socket.on("newRequestArrived", data => {
    //  console.log(data);
  });
}
