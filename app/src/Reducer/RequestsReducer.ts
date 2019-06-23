import {
  NEW_REQUEST_RAISED,
  NEW_REQUEST_ARRIVED,
  ALL_REQUEST_FETCH
} from "../AppConstants";
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
      console.log("newRequest From Clinet End");
      socket.emit("newRequest", action.payload);
      return state;
    }
    case NEW_REQUEST_ARRIVED: {
      //instead of pushing to  array you can push to socket
      state.push(action.payload as RequestMessage);
      return state;
    }

    case ALL_REQUEST_FETCH: {
      var RequestMessages = action.payload as RequestMessage[];
      console.log(RequestMessages);

      state = RequestMessages;
      return state;
    }

    default: {
      return initialState;
    }
  }
}
