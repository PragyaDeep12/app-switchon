import * as React from "react";
import store from "../Reducer/Store";
export default function PendingRequest(props: any) {
  var requestList = store.getState().request;
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
          {requestList[0].message}
        </span>
      </div>
      <div className="input-group-append">
        <span className="input-group-text" id="basic-addon3">
          {requestList[0].userFrom ? requestList[0].userFrom.name : ""}
        </span>
      </div>
    </div>
  );
}
