import React, { useState, useEffect, useContext } from "react";
// import firebase from "firebase";
import { socket } from "../Dao/SocketDAO";
import { openSnackbar } from "./CustomSnackBar";
import { Redirect } from "react-router";
import store from "../Reducer/Store";
import { updateUser } from "../Actions/UserActions";
import LoginContext from "../Context/LoginContext";
export default function Navbar() {
  // let isM
  const {
    state,
    actions: { logout }
  } = useContext<any>(LoginContext);
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">
          Navbar
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link" href="#">
                Home <span className="sr-only">(current)</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Link
              </a>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Dropdown
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <a className="dropdown-item" href="#">
                  Action
                </a>
                <a className="dropdown-item" href="#">
                  Another action
                </a>
                <div className="dropdown-divider" />
                <a className="dropdown-item" href="#">
                  Something else here
                </a>
              </div>
            </li>
            <li className="nav-item">
              <a className="nav-link disabled" href="#">
                Disabled
              </a>
            </li>
          </ul>
          <form className="form-inline my-2 my-lg-0">
            <button
              type="button"
              className="navbar-logout"
              onClick={async () => {
                //to logout the user just remove it from the store
                // store.dispatch(updateUser(null));
                logout();

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
          </form>
        </div>
      </nav>
      {/* <nav classNameName="navbar navbar-expand-lg navbar-light bg-light">
        <a href="#" classNameName="navbar-brand">
          <img classNameName="chat-icon" />
          Chat Room
        </a>
        <button
          type="button"
          classNameName="navbar-logout"
          onClick={async () => {
            //to logout the user just remove it from the store
            // store.dispatch(updateUser(null));
            logout();

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
      </nav> */}
    </div>
  );
}
