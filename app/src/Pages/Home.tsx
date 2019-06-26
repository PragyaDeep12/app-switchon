import React, { useEffect, useState, useContext } from "react";
import Navbar from "../Components/Navbar";
import RequestForm from "../Components/RequestForm";
import PendingRequestList from "../Components/PendingRequestList";
import ApprovedList from "../Components/ApprovedList";
import WaitingList from "../Components/WaitingList";
import RejectList from "../Components/RejectList";
import { socket } from "../Dao/SocketDAO";
import LoginContext from "../Context/LoginContext";
import store from "../Reducer/Store";
import {
  newRequestArrived,
  recievedAllRequests
} from "../Actions/RequestActions";
import User from "../Models/User";
import CustomSnackbar, { openSnackbar } from "../Components/CustomSnackBar";
import { getCurrentUser } from "../Actions/UserActions";

export default function Home(props: any) {
  const [isUpdated, setIsUpdated] = useState<boolean>(false);

  const [user, setUser] = useState<User>(getCurrentUser());
  const {
    state: { loginInfo }
  } = useContext(LoginContext);
  let isMounted = false;
  // window.addEventListener("resize", listner => {
  //   if (window.innerWidth <= 700) {
  //     setIsMobile(true);
  //   } else {
  //     setIsMobile(false);
  //   }
  // });
  //  var user = store.getState().user as User;
  useEffect(() => {
    if (!isMounted) {
      socket.on("AllRequestsFetched", (requestList: any) => {
        //  //console.log(requestList);
        store.dispatch(recievedAllRequests(requestList));
      });
      isMounted = true;
      store.subscribe(() => {
        // var request = store.getState().request as RequestMessage[];
        // //console.log(request);
        //   //console.log(user);
      });
      if (user)
        // socket.emit("getAllRequest", loginInfo.user.department);

        // if (window.innerWidth <= 700) {
        //   setIsMobile(true);
        // } else {
        //   setIsMobile(false);
        // }

        socket.emit("fetchAllRequests", "OK");
      setIsUpdated(!isUpdated);
    }
  }, [props.page]);
  socket.on("newRequestArrived", (data: any) => {
    //console.log("new request arrived");

    if (data.department === user.department) {
      openSnackbar({ message: "New Request Arrived On this department" });
    }

    setIsUpdated(!isUpdated);
    //console.log(store.getState());
  });

  socket.on("approvedRequest", (data: any) => {
    // //console.log(data);
    if (store.getState().user) {
      // alert(store.getState().user);
      //  //console.log(store.getState().user);
      //console.log(data);
      if (user.email === data.userFrom.email)
        openSnackbar({ message: "request was approved" });
    }
  });
  socket.on("rejectedRequest", (data: any) => {
    ////console.log(data);
    if (store.getState().user) {
      // alert(store.getState().user);
      //  //console.log(store.getState().user);
      //console.log(data);
      if (user.email === data.userFrom.email)
        openSnackbar({ message: "request was rejected" });
    }
  });
  // socket.on("AllRequestsFetched", (requestList: any) => {
  //   //console.log(requestList);
  //   store.dispatch(recievedAllRequests(requestList));
  // });

  // useEffect(() => {
  //   // //console.log(isMobile);
  //   if (!isMobile) {
  //     document.getElementsByClassName(
  //       "sidenav---sidenav-toggle---1KRjR"
  //     )[0].className = "vanish";
  //   } else {
  //     document.getElementsByClassName("vanish")[0].className =
  //       "sidenav---sidenav-toggle---1KRjR";
  //   }
  // }, [isMobile]);
  return (
    <div style={{ minWidth: "850px" }}>
      <React.Fragment>
        <Navbar />
        {props.page === "form" ? (
          <RequestForm />
        ) : props.page === "pending" ? (
          <PendingRequestList />
        ) : props.page === "approved" ? (
          <ApprovedList />
        ) : props.page === "rejected" ? (
          <RejectList />
        ) : (
          <WaitingList />
        )}
      </React.Fragment>
    </div>
  );
}
