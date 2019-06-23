import { NEW_REQUEST_RAISED, NEW_REQUEST_ARRIVED } from "../AppConstants";
import RequestMessage from "../Models/RequestMessage";
import { newRequest } from "../Actions/RequestActions";
import { socket } from "../Dao/SocketDAO";

const initialState: RequestMessage[] = [];
export default function requestReducer(
  state: RequestMessage[] = [],
  action: any
) {
  // var user: User;
  switch (action.type) {
    case NEW_REQUEST_RAISED: {
      //instead of pushing to  array you can push to socket
      //  state.push(action.payload as RequestMessage);
      //push data using to server using socket
      socket.emit("newRequest", action.payload);
      return state;
    }
    case NEW_REQUEST_ARRIVED: {
      //instead of pushing to  array you can push to socket
      state.push(action.payload as RequestMessage);

      return state;
    }

    default: {
      return initialState;
    }
  }
}
