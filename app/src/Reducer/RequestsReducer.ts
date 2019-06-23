import { NEW_REQUEST_RAISED } from "../AppConstants";
import RequestMessage from "../Models/RequestMessage";

const initialState: RequestMessage[] = [];
export default function requestReducer(
  state: RequestMessage[] = [],
  actions: any
) {
  // var user: User;
  switch (actions.type) {
    case NEW_REQUEST_RAISED: {
      console.log(actions.payload);
      state.push(actions.payload as RequestMessage);
      return state;

      break;
    }

    default:
      return initialState;
  }
}
