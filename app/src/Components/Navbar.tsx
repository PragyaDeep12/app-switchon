import React, { useState, useEffect } from "react";
// import firebase from "firebase";
import { socket } from "../Dao/SocketDAO";
import { openSnackbar } from "./CustomSnackBar";
import { Redirect } from "react-router";
import store from "../Reducer/Store";
import { updateUser } from "../Actions/UserActions";
export default function Navbar() {
  // let isM
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a href="#" className="navbar-brand">
          <img className="chat-icon" />
          Chat Room
        </a>
        <button
          type="button"
          className="navbar-logout"
          onClick={async () => {
            //to logout the user just remove it from the store
            store.dispatch(updateUser(null));

            // console.log("here");
            // socket.disconnect();
            // localStorage.removeItem("user");
            // window.location.href = "/login";
            // socket.disconnect();
            // // await firebase.auth().signOut();
            // openSnackbar({ message: "Demo Message", timeout: 3000 });
          }}
        >
          logout
        </button>
      </nav>
    </div>
  );
}
