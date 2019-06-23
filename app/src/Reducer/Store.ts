import { createStore, combineReducers } from "redux";
import userReducer from "./UserReducer";
import requestReducer from "./RequestsReducer";
const rootReducer = combineReducers({
  user: userReducer,
  request: requestReducer
});
const store = createStore(rootReducer);

export default store;
