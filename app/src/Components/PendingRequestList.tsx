import React, { useContext } from "react";
import { useEffect, useState } from "react";
import { Component } from "react";
import PendingRequest from "./PendingRequest";
import store from "../Reducer/Store";
import { socket } from "../Dao/SocketDAO";
import { recievedAllRequests } from "../Actions/RequestActions";
import RequestMessage from "../Models/RequestMessage";
import LoginContext from "../Context/LoginContext";
import User from "../Models/User";
export default function PendingRequestList() {
  const [requestList, setRequestList] = useState<RequestMessage[]>();
  const {
    state: { loginInfo }
  } = useContext(LoginContext);
  const [user, setUser] = useState();
  const [updated, setUpdated] = useState(false);
  let isMounted = false;
  useEffect(() => {
    if (!isMounted) {
      isMounted = true;
      console.log("helo");
      socket.emit("fetchAllRequests", "OK");
      console.log("emitted");
      setUser(store.getState().user as User);
      setRequestList(store.getState().request);
      store.subscribe(() => {
        var requestList = store.getState().request;
        console.log(requestList);
        setRequestList(requestList);
      });
    }
  }, []);

  return (
    <div className="mr-3 ml-3">
      {requestList
        ? requestList.map((request, index) => {
            if (user && request.userTo && user.email === request.userTo.email) {
              console.log(request.userTo.email);
              return <PendingRequest request={request} key={index} />;
            }
          })
        : ""}
    </div>
  );
}
