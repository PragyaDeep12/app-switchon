import React, { useEffect, useState } from "react";
import RequestMessage from "../Models/RequestMessage";
import { socket } from "../Dao/SocketDAO";
export default function PendingRequest(props: any) {
  // var requestList = store.getState().request;
  const { request } = props;
  // useEffect(() => {
  //   setRequestMessage(request);
  //   console.log(request);
  // }, []);

  return (
    // <div>{request.userTo ? request.userTo.email : ""}</div>
    <div className="input-group mb-1 ">
      <div
        className="form-control"
        style={{
          wordWrap: "break-word",
          height: "auto"
        }}
      >
        {props.request.userFrom.email +
          "from" +
          props.request.userFrom.department}
      </div>
      <div className="input-group-append">
        <span
          className="btn btn-success"
          id="basic-addon2"
          aria-describedby="basic-addon3"
          onClick={() => {
            socket.emit("updateRequest", {
              request: request,
              state: "approved"
            });
          }}
        >
          APPROVE
        </span>
      </div>
      <div className="input-group-append">
        <span
          className="input-group-text"
          id="basic-addon3"
          onClick={() => {
            socket.emit("updateRequest", {
              request: request,
              state: "rejected"
            });
          }}
        >
          REJECT
        </span>
      </div>
    </div>
  );
}
