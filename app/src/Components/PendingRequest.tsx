import React, { useEffect, useState } from "react";
import RequestMessage from "../Models/RequestMessage";
export default function PendingRequest(props: any) {
  // var requestList = store.getState().request;
  const { request } = props;
  // useEffect(() => {
  //   setRequestMessage(request);
  //   console.log(request);
  // }, []);

  return (
    // <div>{request.userTo ? request.userTo.email : ""}</div>
    <div className="input-group mb-3">
      <input
        type="text"
        className="form-control"
        aria-label="Recipient's username"
        aria-describedby="basic-addon2"
        value={
          props.request.userFrom.email +
          "from" +
          props.request.userFrom.department
        }
      />
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
