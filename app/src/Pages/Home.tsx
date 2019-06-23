import React, { useEffect, useState, useContext } from "react";
import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";
import RequestForm from "../Components/RequestForm";
import PendingRequestList from "../Components/PendingRequestList";
import ApprovedList from "../Components/ApprovedList";
import WaitingList from "../Components/WaitingList";
import { socket } from "../Dao/SocketDAO";
import LoginContext from "../Context/LoginContext";
import store from "../Reducer/Store";
import {
  newRequestArrived,
  recievedAllRequests
} from "../Actions/RequestActions";

export default function Home(props: any) {
  const [isUpdated, setIsUpdated] = useState<boolean>(false);
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

  useEffect(() => {
    if (!isMounted) {
      isMounted = true;
      if (loginInfo.user)
        // socket.emit("getAllRequest", loginInfo.user.department);

        // if (window.innerWidth <= 700) {
        //   setIsMobile(true);
        // } else {
        //   setIsMobile(false);
        // }
        setIsUpdated(!isUpdated);
    }
  }, [store.getState()]);
  socket.on("newRequestArrived", (data: any) => {
    console.log("new request arrived");
    store.dispatch(newRequestArrived(data));
    setIsUpdated(!isUpdated);
    console.log(store.getState());
  });
  socket.on("AllRequestsFetched", (requestList: any) => {
    console.log(requestList);
    store.dispatch(recievedAllRequests(requestList));
  });

  // useEffect(() => {
  //   // console.log(isMobile);
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
    <React.Fragment>
      {props.page === "form" ? (
        <RequestForm />
      ) : props.page === "pending" ? (
        <PendingRequestList />
      ) : props.page === "approved" ? (
        <ApprovedList />
      ) : (
        <WaitingList />
      )}
    </React.Fragment>
  );
}
