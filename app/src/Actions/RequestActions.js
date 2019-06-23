import store from "../Reducer/Store";
import RequestMessage from "../Models/RequestMessage";
import { NEW_REQUEST_RAISED } from "../AppConstants";
export function newRequest(request) {
  console.log(request);
  return { type: NEW_REQUEST_RAISED, payload: request };
}
