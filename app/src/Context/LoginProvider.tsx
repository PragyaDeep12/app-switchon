import React, { useEffect, useState, useReducer, useContext } from "react";
import LoginInfo from "../Models/LoginInfo";
import LoginContext from "./LoginContext";
import userReducer from "../Reducer/UserReducer";
import { UPDATE_USER, LOGIN_USER, CREATE_USER } from "../AppConstants";
import store from "../Reducer/Store";
import User from "../Models/User";
import { Redirect } from "react-router";

export default function LoginProvider(props: any) {
  const [loginInfo, setLoginInfo] = useState<LoginInfo>({
    isLoggedIn: null,
    user: null,
    uid: null
  });
  const setLoginDetails = (loginInfo: LoginInfo) => {
    setLoginInfo(loginInfo);
  };
  const login = async (email: string, password: string) => {
    // console.log(email, password);
    // store.dispatch({
    //   type: LOGIN_USER,
    //   user: {
    //     email: email,
    //     password: password
    //   }
    // });
    // console.log(store.getState().user);
    // //store.

    //check from backend firebase or mongo for loginAuth
    var uid = "jkfsndjkf";
    if (email === "pragya.deep19@gmail.com" && password === "123456") {
      setLoginInfo({ ...loginInfo, isLoggedIn: true });
      getUserDetails(uid);
    }
  };
  const getDb = () => {};

  const signUp = async (user: any) => {
    // console.log(
    //   await store.dispatch({
    //     type: CREATE_USER,
    //     user: user
    //   })
    // );
  };
  const getUserDetails = (uid: string) => {
    //fetch data from data base
    var user: User = {
      department: "department1",
      email: "pragya.deep19@gmail.com",
      name: "Pragya Deep",
      status: "online",
      userName: "Pragya19",
      uid: uid
    };
    store.dispatch({
      type: UPDATE_USER,
      payload: { user: user }
    });
    if (store.getState().user as User)
      setLoginInfo({
        ...loginInfo,
        user: store.getState().user as User,
        isLoggedIn: true
      });

    console.log(store.getState().user);
  };
  return (
    <LoginContext.Provider
      value={{
        state: { loginInfo },
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
