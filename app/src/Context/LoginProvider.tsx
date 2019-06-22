import React, { useEffect, useState, useReducer, useContext } from "react";
import LoginInfo from "../Models/LoginInfo";
import LoginContext from "./LoginContext";
import userReducer from "../Reducer/UserReducer";
import { UPDATE_USER, LOGIN_USER, CREATE_USER } from "../AppConstants";

export default function LoginProvider(props: any) {
  const [state, dispatch] = useReducer(userReducer, {
    loginInfo: null
  });
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

  const signUp = async (user: any) => {
    console.log(
      await dispatch({
        type: CREATE_USER,
        user: user
      })
    );
    console.log(state);
  };
  const getUserDetails = (uid: any) => {
    console.log(uid);
  };
  return (
    <LoginContext.Provider
      value={{
        state: state.loginInfo,
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
export const useContextHook = () => {
  const contextValue = useContext(LoginContext);
  return contextValue;
};
