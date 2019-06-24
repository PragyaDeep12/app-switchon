import React, { useEffect, useState } from "react";
import RequestMessage from "../Models/RequestMessage";
import EachComponent from "./EachComponent";
export default function RequestBox(props: any) {
  // var requestList = store.getState().request;
  const { request } = props;

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
        {/* 
        {props.request.userFrom.email +
          "||  from" +
          props.request.userFrom.department +
          "  ||to " +
          props.request.userTo.email} */}
      </div>
    </div>
  );
}
