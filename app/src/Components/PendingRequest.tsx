import React, { useEffect, useState } from "react";
import RequestMessage from "../Models/RequestMessage";
import EachComponent from "./EachComponent";
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
        <EachComponent request={props.request} />
      </div>
      <div className="input-group-append">
        <span
          className="btn btn-success"
          id="basic-addon2"
          aria-describedby="basic-addon3"
        >
          APPROVE
        </span>
      </div>
      <div className="input-group-append">
        <span className="input-group-text" id="basic-addon3">
          REJECT
        </span>
      </div>
    </div>
  );
}
