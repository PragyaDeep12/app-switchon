import React from "react";
import { useEffect, useState } from "react";
import { Component } from "react";
import PendingRequest from "./PendingRequest";
import store from "../Reducer/Store";
import { socket } from "../Dao/SocketDAO";
import { recievedAllRequests } from "../Actions/RequestActions";
import RequestMessage from "../Models/RequestMessage";
export default function PendingRequestList() {
  const [requestList, setRequestList] = useState<RequestMessage[]>();

  let isMounted = false;
  useEffect(() => {
    if (!isMounted) {
      isMounted = true;
      console.log("helo");
      socket.emit("fetchAllRequests", "OK");
      console.log("emitted");
      socket.on("AllRequestsFetched", (requestList: any) => {
        console.log(requestList);
        store.dispatch(recievedAllRequests(requestList));
      });
      setRequestList(store.getState().request);
      store.subscribe(() => {
        var requestList = store.getState().request;
        console.log(requestList);
        setRequestList(store.getState().request);
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
            console.log(request);
            return <PendingRequest request={request} key={index} />;
          })
        : ""}
    </div>
  );
}
