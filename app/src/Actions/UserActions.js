import {
  CREATE_USER,
  UPDATE_USER,
  LOGIN_USER,
  LOGIN_SUCCESS
} from "../AppConstants";
import { socket } from "../Dao/SocketDAO";
import { useContext } from "react";
import LoginContext from "../Context/LoginContext";
import store from "../Reducer/Store";

export function createUser(user, state) {
  //   console.log(user.password);
  //   return {
  //     ...state,
  //     loginInfo: {
  //       user: {
  //         userName: "abcd",
  //         name: "myName",
  //         email: user.email,
  //         uid: "somethingsomething"
  //       },
  //       isLoggedIn: true
  //     }
  //   };
  //   // } else
  //   //   return {
  //   //     payload: {
  //   //       loginInfo: {
  //   //         user: null,
  //   //         isLoggedIn: false
  //   //       }
  //   //     }
  //   //   };
  //   // socket.emit("addNewUser", { user: user, password: password });
  //   // return {
  //   //   payload: { loginInfo: { user: user } }
  //   // };
  // }
  // export function updateUser(newUser) {
  //   console.log("in the update user action");
  //   return {
  //     payload: {
  //       loginInfo: { user: newUser }
  //     }
  //   };
  // }
  // export function loginUser(email, password) {
  //   console.log("in the login user action", email, password);
  //   //login the user
  //   if (email === "pragya.deep19@gmail.com" && password === "123456") {
  //     //setLoginDetails({ isLoggedIn: true, uid: null, user: null });
  //     store.dispatch({
  //       type: LOGIN_SUCCESS,
  //       payload: { isLoggedIn: true }
  //     });
  //     // console.log(va);
  //   } else {
  //     store.dispatch({
  //       type: LOGIN_SUCCESS,
  //       payload: { isLoggedIn: false }
  //     });
  //     // console.log(va);
  //     //setLoginDetails({ isLoggedIn: false, uid: null, user: null });
  //   }
  //   // var va=
}
