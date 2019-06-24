import React, { useEffect, useContext } from "react";
import { useState } from "react";
import RequestMessage from "../Models/RequestMessage";
import RequestBox from "./RequestBox";
import { socket } from "../Dao/SocketDAO";
import PendingRequest from "./PendingRequest";
import store from "../Reducer/Store";
import LoginContext from "../Context/LoginContext";
import User from "../Models/User";
import { getCurrentUser } from "../Actions/UserActions";
export default function WaitingList() {
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
            if (user && request.userTo) {
              console.log(request.userTo.email);
              return <RequestBox request={request} key={index} />;
            }
          })
        : ""}
    </div>
  );
}
