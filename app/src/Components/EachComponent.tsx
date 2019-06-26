import React from "react";
import RequestMessage from "../Models/RequestMessage";
import { format } from "date-fns";
export default function EachComponent(props) {
  const request: RequestMessage = props.request;
  // ///console.log(request);
  return (
    <div className="row">
      <span className="col">{request.userFrom.email}</span>
      <span className="col">{request.userTo.email}</span>
      <span className="col">{request.department}</span>
      <span className="col">{request.message}</span>

      <span className="col">{format(request.time, "DD-MM|hh:mm:ss a")}</span>
    </div>
  );
}
