import { CREATE_USER, UPDATE_USER, LOGIN_USER } from "../AppConstants";
import { socket } from "../Dao/SocketDAO";

export function createUser(user, state) {
  console.log(user.password);
  return {
    ...state,
    loginInfo: {
      user: {
        userName: "abcd",
        name: "myName",
        email: user.email,
        uid: "somethingsomething"
      },
      isLoggedIn: true
    }
  };
  // } else
  //   return {
  //     payload: {
  //       loginInfo: {
  //         user: null,
  //         isLoggedIn: false
  //       }
  //     }
  //   };
  // socket.emit("addNewUser", { user: user, password: password });
  // return {
  //   payload: { loginInfo: { user: user } }
  // };
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
  //login the user
  if (email === "pragya.deep19@gmail.com" && password === "123456")
    return {
      payload: {
        loginInfo: {
          user: {
            userName: "abcd",
            name: "myName",
            email: email,
            uid: "somethingsomething"
          },
          isLoggedIn: true
        }
      }
    };
  else
    return {
      payload: {
        loginInfo: {
          user: null,
          isLoggedIn: false
        }
      }
    };
}
