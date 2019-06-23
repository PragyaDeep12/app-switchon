import React, { useContext } from "react";
import { useEffect, useState } from "react";
import { Component } from "react";
import PendingRequest from "./PendingRequest";
import store from "../Reducer/Store";
import { socket } from "../Dao/SocketDAO";
import { recievedAllRequests } from "../Actions/RequestActions";
import RequestMessage from "../Models/RequestMessage";
import LoginContext from "../Context/LoginContext";
export default function PendingRequestList() {
  const [requestList, setRequestList] = useState<RequestMessage[]>();
  const {
    state: { loginInfo }
  } = useContext(LoginContext);
  const [updated, setUpdated] = useState(false);
  let isMounted = false;
  useEffect(() => {
    if (!isMounted) {
      isMounted = true;
      console.log("helo");
      socket.emit("fetchAllRequests", "OK");
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
    // <div>
    //   <div className="input-group mb-3">
    //     <input
    //       type="text"
    //       className="form-control"
    //       placeholder="Recipient's username"
    //       aria-label="Recipient's username"
    //       aria-describedby="basic-addon2"
    //     />
    //     <div className="input-group-append">
    //       <span
    //         className="input-group-text"
    //         id="basic-addon2"
    //         aria-describedby="basic-addon3"
    //       >
    //         @example.com1
    //       </span>
    //     </div>
    //     <div className="input-group-append">
    //       <span className="input-group-text" id="basic-addon3">
    //         @example.com
    //       </span>
    //     </div>
    //   </div>
    <div>
      {requestList
        ? requestList.map((request, index) => {
            console.log(loginInfo.user);

            if (
              loginInfo.user &&
              loginInfo.user.department !== request.department
            )
              return <PendingRequest request={request} key={index} />;
          })
        : ""}
    </div>
  );
}
