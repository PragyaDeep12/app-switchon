import React from "react";
import RequestMessage from "../Models/RequestMessage";
export default function EachComponent(props) {
  const request: RequestMessage = props.request;
  console.log(request);
  return (
    <div className="row">
      <span className="col">{request.userFrom.email}</span>
      <span className="col">{request.userTo.email}</span>
      <span className="col">{request.department}</span>
    </div>
  );
}
