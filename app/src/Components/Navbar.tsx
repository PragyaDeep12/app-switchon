import React, { useState, useEffect, useContext } from "react";
// import firebase from "firebase";
import { socket } from "../Dao/SocketDAO";
import { openSnackbar } from "./CustomSnackBar";
import { Redirect } from "react-router";
import store from "../Reducer/Store";
import { updateUser } from "../Actions/UserActions";
import LoginContext from "../Context/LoginContext";
import { Link } from "react-router-dom";
export default function Navbar() {
  // let isM
  const {
    state,
    actions: { logout }
  } = useContext<any>(LoginContext);
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to="/form">
          Request App
        </Link>

        <div className="" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto ">
            <li className="nav-item">
              <Link className="nav-link" to="/requestform">
                Request
              </Link>
            </li>
            <li className="nav-item ">
              <Link className="nav-link" to="/pending">
                Pending
              </Link>
            </li>

            <li className="nav-item ">
              <Link className="nav-link" to="/waitinglist">
                Waiting List
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/approved">
                Approved
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/rejected">
                Rejected
              </Link>
            </li>
          </ul>
          {/* <form className="form-inline my-2 my-lg-0">
            <button
              type="button"
              className="navbar-logout"
              onClick={async () => {
                //to logout the user just remove it from the store
                // store.dispatch(updateUser(null));
                logout();

                // //console.log("here");
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
          </form> */}
        </div>
        <button
          type="button"
          className="navbar-logout"
          onClick={async () => {
            //to logout the user just remove it from the store
            // store.dispatch(updateUser(null));
            logout();

            // //console.log("here");
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

            // //console.log("here");
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
