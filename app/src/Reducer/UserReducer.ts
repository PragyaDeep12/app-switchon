import { CREATE_USER, UPDATE_USER, LOGIN_USER } from "../AppConstants";
import { createUser, updateUser, loginUser } from "../Actions/UserActions";

export default function userReducer(state: any, actions: any) {
  switch (actions.type) {
    case CREATE_USER:
      //console.log(actions);
      {
        var value = createUser(actions.user);
        console.log(value);
        state = value;
        console.log(state);
        return state;
      }
      break;
    case UPDATE_USER:
      {
        var va = updateUser(actions.user);
        console.log(value);
        console.log(state);
        return va;
      }

      break;
    case LOGIN_USER:
      return loginUser();
      break;
    default:
      return {};
  }
}
