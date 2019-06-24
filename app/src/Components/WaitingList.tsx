import React, { useEffect, useContext } from "react";
import { useState } from "react";
import RequestMessage from "../Models/RequestMessage";
import { socket } from "../Dao/SocketDAO";
import PendingRequest from "./PendingRequest";
import store from "../Reducer/Store";
import LoginContext from "../Context/LoginContext";
import User from "../Models/User";
export default function WaitingList() {
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
    <div>
      {requestList
        ? requestList.map((request, index) => {
            if (
              user &&
              request.userTo &&
              user.department === request.userTo.department
            ) {
              console.log(request.userTo.email);
              return <PendingRequest request={request} key={index} />;
            }
          })
        : ""}
    </div>
  );
}
