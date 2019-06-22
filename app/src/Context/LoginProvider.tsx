import React, { useEffect, useState, useReducer } from "react";
import LoginInfo from "../Models/LoginInfo";
import LoginContext from "./LoginContext";
import userReducer from "../Reducer/UserReducer";
import { UPDATE_USER, LOGIN_USER } from "../AppConstants";

export default function LoginProvider(props: any) {
  const [loginInfoState, dispatch] = useReducer(userReducer, {});
  const setLoginDetails = (loginInfo: LoginInfo) => {
    dispatch({
      type: UPDATE_USER,
      user: loginInfo.user
    });
  };
  const login = async (email: string, password: string) => {
    dispatch({
      type: LOGIN_USER,
      email: email,
      password: password
    });
  };
  const getDb = () => {};

  const signUp = async (
    email: string,
    password: string,
    userName: string,
    name: string
  ) => {};
  const getUserDetails = (uid: any) => {
    console.log(uid);
  };
  return (
    <LoginContext.Provider
      value={{
        state: { ...loginInfoState.loginInfo },
        actions: {
          login,
          getUserDetails,
          signUp,
          setLoginDetails
        }
      }}
    >
      {props.children}
    </LoginContext.Provider>
  );
}
