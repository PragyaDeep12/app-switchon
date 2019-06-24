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

export function createUser(user, state) {}
