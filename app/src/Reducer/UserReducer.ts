import { CREATE_USER, UPDATE_USER, LOGIN_USER } from "../AppConstants";
import { createUser } from "../Actions/UserActions";

export default function userReducer(state: any, actions: any) {
  switch (actions.type) {
    case CREATE_USER:
      console.log(actions);
      return createUser(actions.user, actions.password);
      break;
    case UPDATE_USER:
      return actions.payload.loginInfo;
      break;
    case LOGIN_USER:
      return actions.payload.loginInfo;
      break;
    default:
      return state;
  }

  return state;
}
