import { CREATE_USER, UPDATE_USER, LOGIN_USER } from "../AppConstants";
import { socket } from "../Dao/SocketDAO";

export function createUser(user, password) {
  console.log(password);
  socket.emit("addNewUser", { user: user, password: password });
  return {
    payload: { loginInfo: { user: user } }
  };
}

export function updateUser(newUser) {
  console.log("in the update user action");
  return {
    payload: {
      loginInfo: { user: newUser }
    }
  };
}
export function loginUser(email, password) {
  console.log("in the login user action", email, password);
  return {
    payload: {
      loginInfo: {
        isLoggedIn: true
      }
    }
  };
}
