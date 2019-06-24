import React, { useEffect, useState, useReducer, useContext } from "react";
import LoginInfo from "../Models/LoginInfo";
import LoginContext from "./LoginContext";
import userReducer from "../Reducer/UserReducer";
import { UPDATE_USER, LOGIN_USER, CREATE_USER } from "../AppConstants";
import store from "../Reducer/Store";
import User from "../Models/User";
import { Redirect } from "react-router";
import { socket } from "../Dao/SocketDAO";
import { updateUser } from "../Actions/UserActions";

export default function LoginProvider(props: any) {
  const [loginInfo, setLoginInfo] = useState<LoginInfo>({
    isLoggedIn: null
  });
  const setLoginDetails = (loginInfo: LoginInfo) => {
    setLoginInfo(loginInfo);
  };
  const login = async (email: string, password: string) => {
    //check from backend firebase or mongo for loginAuth
    console.log("Loggin in");
    socket.emit("loginUser", { email: email, password: password });
    socket.on("loginSuccessful", async (data: any) => {
      console.log("logged in");
      console.log(data);
      setUserDetails(data);
      setLoginDetails({ isLoggedIn: true });
    });
    socket.on("loginFailed", async (data: any) => {
      console.log(data);
    });
  };
  const getDb = () => {};

  const signUp = async (user: any) => {
    socket.emit("signUpUser", { user: user, password: user.password });
    socket.on("signUpSuccessful", async (data: any) => {
      console.log(data);
      await setUserDetails(data);

      setLoginDetails({ isLoggedIn: true });
    });
    socket.on("signUpFailed", (data: any) => {
      console.log(data);
    });
  };
  const setUserDetails = (user: any) => {
    store.dispatch(updateUser(user));
  };
  const logout = () => {
    store.dispatch(updateUser(null));
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
