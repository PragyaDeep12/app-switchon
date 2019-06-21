import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";
import RequestForm from "../Components/RequestForm";
import PendingRequestList from "../Components/PendingRequestList";
import ApprovedList from "../Components/ApprovedList";
import WaitingList from "../Components/WaitingList";

export default function Home(props: any) {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  let isMounted = false;
  window.addEventListener("resize", listner => {
    if (window.innerWidth <= 700) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  });
  useEffect(() => {
    if (!isMounted) {
      isMounted = true;
      if (window.innerWidth <= 700) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    }
  }, []);
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
