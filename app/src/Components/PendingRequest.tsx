import React, { useEffect, useState } from "react";
export default function PendingRequest(props: any) {
  // var requestList = store.getState().request;
  const { request } = props;
  console.log(request);
  return (
    <div className="input-group mb-3">
      <input
        type="text"
        className="form-control"
        placeholder="Recipient's username"
        aria-label="Recipient's username"
        aria-describedby="basic-addon2"
      />
      <div className="input-group-append">
        <span
          className="input-group-text"
          id="basic-addon2"
          aria-describedby="basic-addon3"
        >
          {props.request.userFrom.email}
        </span>
      </div>
      <div className="input-group-append">
        <span className="input-group-text" id="basic-addon3">
          {props.request.userTo.email}
        </span>
      </div>
    </div>
  );
}
