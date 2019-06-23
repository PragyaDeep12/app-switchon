import store from "../Reducer/Store";
import RequestMessage from "../Models/RequestMessage";
import { NEW_REQUEST_RAISED, NEW_REQUEST_ARRIVED } from "../AppConstants";
export function newRequest(request) {
  console.log(request);
  //this statement calls requestReducer with "type"
  return { type: NEW_REQUEST_RAISED, payload: request };
}
export function newRequestArrived(request) {
  return { type: NEW_REQUEST_ARRIVED, payload: request };
}
