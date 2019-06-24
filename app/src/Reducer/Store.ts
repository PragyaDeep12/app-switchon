import { createStore, combineReducers, compose } from "redux";
import userReducer from "./UserReducer";
import requestReducer from "./RequestsReducer";
import devTools, { devToolsEnhancer } from "redux-devtools-extension";
// declare global {
//   interface Window {
//     __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
//   }
// }
const rootReducer = combineReducers({
  user: userReducer,
  request: requestReducer
});

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  window["devToolsExtension"] && window["devToolsExtension"]()
);
export default store;
