import React, { useEffect, useContext, useState } from "react";
import { Component } from "react";
import RequestBox from "./RequestBox";
import store from "../Reducer/Store";
import LoginContext from "../Context/LoginContext";
import User from "../Models/User";
import RequestMessage from "../Models/RequestMessage";
import { getCurrentUser } from "../Actions/UserActions";
export default function ApprovedList() {
  const [requestList, setRequestList] = useState<RequestMessage[]>();
  const {
    state: { loginInfo }
  } = useContext(LoginContext);
  const [user, setUser] = useState<User>(getCurrentUser());
  const [updated, setUpdated] = useState(false);
  let isMounted = false;
  useEffect(() => {
    if (!isMounted) {
      isMounted = true;
      console.log("helo");
      // socket.emit("fetchAllRequests", "OK");
      console.log("emitted");
      setRequestList(store.getState().request);
      store.subscribe(() => {
        var requestList = store.getState().request;
        console.log(requestList);
        setRequestList(requestList);
      });
    }
  }, []);

  return (
    <div>
      {requestList
        ? requestList.map((request, index) => {
            if (user && user.email && request.userTo) {
              console.log(request.userTo.email);
              return <RequestBox request={request} key={index} />;
            }
          })
        : ""}
    </div>
  );
}
