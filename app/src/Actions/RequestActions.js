import store from "../Reducer/Store";
import RequestMessage from "../Models/RequestMessage";
import {
  NEW_REQUEST_RAISED,
  NEW_REQUEST_ARRIVED,
  ALL_REQUEST_FETCH
} from "../AppConstants";
export function newRequest(request) {
 // console.log(request);
  //this statement calls requestReducer with "type"
  return { type: NEW_REQUEST_RAISED, payload: request };
}
export function newRequestArrived(request) {
  return { type: NEW_REQUEST_ARRIVED, payload: request };
}

export function recievedAllRequests(allRequests) {
  return { type: ALL_REQUEST_FETCH, payload: allRequests };
}

export function getCurrentRequestList() {
  return store.getState().request;
}
