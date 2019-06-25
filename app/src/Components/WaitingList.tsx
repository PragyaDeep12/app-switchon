import React, { useEffect, useContext } from "react";
import { useState } from "react";
import RequestMessage from "../Models/RequestMessage";
import RequestBox from "./RequestBox";
import { socket } from "../Dao/SocketDAO";
import PendingRequest from "./PendingRequest";
import store from "../Reducer/Store";
import LoginContext from "../Context/LoginContext";
import User from "../Models/User";
import { getCurrentUser } from "../Actions/UserActions";
import Filter from "./Filter";
export default function WaitingList() {
  const [requestList, setRequestList] = useState<RequestMessage[]>();
  const {
    state: { loginInfo }
  } = useContext(LoginContext);
  var count = 0;
  const [user, setUser] = useState<User>(getCurrentUser());
  const [listSize, setListSize] = useState<number>(50);

  const [updated, setUpdated] = useState(false);
  let isMounted = false;
  useEffect(() => {
    if (!isMounted) {
      isMounted = true;
      console.log("helo");
      // socket.emit("fetchAllRequests", "OK");
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
    <div>
      <Filter
        url="/pending?size=4"
        updateListSize={e => {
          setListSize(e);
        }}
      />
      <div className="mt-5 mr-5 ml-5">
        <div className="row">
          <span className="col">
            <h5>From Email</h5>
          </span>
          <span className="col">
            <h5>To Email</h5>
          </span>
          <span className="col">
            <h5>Department</h5>
          </span>
        </div>
        {requestList
          ? requestList.map((request, index) => {
              if (
                user &&
                request.userTo &&
                request.userTo.department === user.department &&
                request.state === "pending"
              ) {
                count++;
                return count <= listSize ? (
                  <RequestBox request={request} key={index} />
                ) : (
                  ""
                );
              }
            })
          : ""}
      </div>
    </div>
  );
}
