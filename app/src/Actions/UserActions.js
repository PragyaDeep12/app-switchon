import { CREATE_USER, UPDATE_USER, LOGIN_USER } from "../AppConstants";

export function createUser(user, password) {
  
  console.log(password);
  return {
    type: CREATE_USER,
    payload: { loginInfo: { user: user } }
  };
}

export function updateUser(newUser) {
  console.log("in the update user action");
  return {
    type: UPDATE_USER,
    payload: {
      loginInfo: { user: newUser }
    }
  };
}
export function loginUser(email, password) {
  console.log("in the login user action", email, password);
  return {
    type: LOGIN_USER,
    payload: {
      loginInfo: {
        isLoggedIn: true
      }
    }
  };
}
