import {
  CREATE_USER,
  UPDATE_USER,
  LOGIN_USER,
  LOGIN_SUCCESS
} from "../AppConstants";
import { createUser, updateUser, loginUser } from "../Actions/UserActions";
import { useState } from "react";
import LoginInfo from "../Models/LoginInfo";
import User from "../Models/User";

export default function userReducer(state: any, actions: any) {
  var user: User;
  switch (actions.type) {
    // case CREATE_USER:
    //   {
    //     var value = createUser(actions.user);
    //     console.log(value);
    //     state = value;
    //     console.log(state);
    //     return state;
    //   }
    //   break;
    case UPDATE_USER: {
      // var va = updateUser(actions.user);
      // console.log(value);
      // console.log(state);
      // return va;
      user = actions.payload.user;
      console.log(user);
      return user;
      break;
    }

    // case LOGIN_USER: {
    //   console.log(actions.user);
    //   loginUser(actions.user.email, actions.user.password);
    //   break;
    // }
    // case LOGIN_SUCCESS: {
    //   // actions.user.
    //   // console.log
    //   return { user: "Sourav" };
    //   break;
    // }
    default:
      return {};
  }
}
