import React, { useEffect, useState, useReducer, useContext } from "react";
import LoginInfo from "../Models/LoginInfo";
import LoginContext from "./LoginContext";
import userReducer from "../Reducer/UserReducer";
import { UPDATE_USER, LOGIN_USER, CREATE_USER } from "../AppConstants";
import store from "../Reducer/Store";
import User from "../Models/User";
import { Redirect } from "react-router";
import { socket } from "../Dao/SocketDAO";

export default function LoginProvider(props: any) {
  const [loginInfo, setLoginInfo] = useState<LoginInfo>({
    isLoggedIn: null,
    user: null
  });
  const setLoginDetails = (loginInfo: LoginInfo) => {
    setLoginInfo(loginInfo);
  };
  const login = async (email: string, password: string) => {
    //check from backend firebase or mongo for loginAuth
    socket.emit("loginUser", { email: email, password: password });
    socket.on("loginSuccessful", async (data: any) => {
      console.log(data);
      localStorage.setItem("user", JSON.stringify(data));
      await setUserDetails(data);
    });
    socket.on("loginFailed", async (data: any) => {
      console.log(data);
    });
  };
  const getDb = () => {};

  const signUp = async (user: any) => {
    socket.emit("signUpUser", { user: user, password: user.password });
    socket.on("signUpSuccessful", (data: any) => {
      console.log(data);
      setUserDetails(data);
    });
    socket.on("signUpFailed", (data: any) => {
      console.log(data);
    });
  };
  const setUserDetails = (user: any) => {
    //fetch data from data base
    // console.log(JSON.parse(user));
    // console.log(JSON.parse(user));
    store.dispatch({
      type: UPDATE_USER,
      payload: { user: user }
    });
    // if (store.getState().user as User)
    //   setLoginInfo({
    //     ...loginInfo,
    //     user: store.getState().user as User,
    //     isLoggedIn: true
    //   });

    console.log(store.getState().user);
  };
  const logout = () => {
    store.dispatch({
      type: UPDATE_USER,
      payload: { user: {} }
    });
    if (store.getState().user as User)
      setLoginInfo({
        ...loginInfo,
        user: store.getState().user as User,
        isLoggedIn: false
      });
  };
  return (
    <LoginContext.Provider
      value={{
        state: { loginInfo },
        actions: {
          login,
          setUserDetails,
          signUp,
          setLoginDetails,
          logout
        }
      }}
    >
      {props.children}
    </LoginContext.Provider>
  );
}
export const useContextHook = () => {
  const contextValue = useContext(LoginContext);
  return contextValue;
};
