import React, { useState, useEffect } from "react";
import SignupComponent from "../Components/SignupComponent";
import LoginComponent from "../Components/LoginComponent";
import appIcon from "../icons/app-icon.svg";
import { connect } from "react-redux";
import { createSelector } from "reselect";
import { createUser } from "../Actions/UserActions";
import User from "../Models/User";
function LoginSignup(props: any) {
  // const onCreateUser = (user: User, password: String) => {
  //   props.onCreateUser(user, password);
  // };
  return (
    <React.Fragment>
      <img src={appIcon} alt="" className="app-icon" />

      {props.page === "signup" ? <SignupComponent /> : <LoginComponent />}
    </React.Fragment>
  );
}
// const mapPropsToState = createSelector(
//   (state: any) => state.user,
//   user => ({
//     user
//   })
// );
// const mapPropsToAction = {
//   onCreateUser: createUser
// };
// export default connect(
//   mapPropsToState,
//   mapPropsToAction
// )(LoginSignup);
export default LoginSignup;
