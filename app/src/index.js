import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

import { combineReducers, createStore } from "redux";
import { Provider } from "react-redux";
import userReducer from "./Reducer/UserReducer";
import requestReducer from "./Reducer/RequestsReducer";

// const allReducers = combineReducers({
//   requests: requestReducer,
//   user: userReducer
// });
// const store = createStore(
//   allReducers,
//   {
//     requests: [
//       { message: "first-message", fromUser: "Pragya", toUser: "Honey" },
//       { message: "first-message", fromUser: "Pragya", toUser: "Honey" }
//     ],
//     user: {
//       name: "Pragya",
//       userName: "xxx",
//       emailId: "pragya.deep19@gmail.com"
//     }
//   },
//   window.devToolsExtension && window.devToolsExtension()
// );
// const createUserAction = {
//   type: "createUser",
//   payload: {
//     user: {
//       userName: "Pragya",
//       name: "pragya deep",
//       emailId: "pragya.deep19@gmail.com"
//     }
//   }
// };
// store.dispatch(createUserAction);
// console.log(store.getState());
ReactDOM.render(
  // <Provider store={store}>
  //   <App />
  // </Provider>,
  <App />,
  document.getElementById("root")
);

serviceWorker.unregister();
