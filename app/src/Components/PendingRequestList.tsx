import React, { useContext } from "react";
import { useEffect, useState } from "react";
import { Component } from "react";
import PendingRequest from "./PendingRequest";
import Filter from "./Filter";
import store from "../Reducer/Store";
import { socket } from "../Dao/SocketDAO";
import {
  recievedAllRequests,
  getCurrentRequestList
} from "../Actions/RequestActions";
import queryString from "query-string";
import RequestMessage from "../Models/RequestMessage";
import LoginContext from "../Context/LoginContext";
import User from "../Models/User";
import Navbar from "./Navbar";
import { getCurrentUser } from "../Actions/UserActions";
export default function PendingRequestList(props) {
  const [listSize, setListSize] = useState<number>(50);
  const [requestList, setRequestList] = useState<RequestMessage[]>(
    getCurrentRequestList()
  );
  const {
    state: { loginInfo }
  } = useContext(LoginContext);
  const [user, setUser] = useState<User>(getCurrentUser());
  const [updated, setUpdated] = useState(false);
  let isMounted = false;
  var count = 0;
  useEffect(() => {
    if (!isMounted) {
      isMounted = true;
      // //console.log("helo");
      socket.emit("fetchAllRequests", "OK");
      ////console.log("emitted");
      // const values = queryString.parse(props.location.search);
      // if (values) {
      //   var size = values["size"];
      //   //console.log(size);
      //   if (size) setListSize(parseInt(size.toString()));
      // }
      // if(values)
      // setListSize(values.size as number);
      // //console.log();
      // setUser(store.getState().user as User);
      store.subscribe(() => {
        var requestList = store.getState().request as RequestMessage[];
        ////console.log(requestList);
        setRequestList(requestList);
        // var request = store.getState().request as RequestMessage[];
        // //console.log(request);
        // //console.log(user);
      });
    }
    //console.log(isMounted + "isMounted");
  }, []);
  // useEffect(() => {
  //   //console.log(listSize);
  // }, [listSize]);
  // useEffect(() => {
  //   setRequestList(store.getState().request);
  //   store.subscribe(() => {
  //     var requestList = store.getState().request;
  //     //console.log(requestList);
  //     setRequestList(requestList);
  //   });
  // }, [store.getState()]);
  // socket.on("AllRequestsFetched", (requestList: any) => {
  //   //console.log(requestList);
  //   store.dispatch(recievedAllRequests(requestList));
  // });

  return (
    <div>
      <Filter
        url="/pending?size=4"
        updateListSize={e => {
          setListSize(e);
        }}
      />
      <label className="note">
        <span>*</span> NOTE : showing the requests pending for you
      </label>
      <br />
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
          </span>{" "}
          <span className="col">
            <h5>Message</h5>
          </span>{" "}
          <span className="col">
            <h5>Time </h5>
          </span>{" "}
          <span className="col">
            <h5>Approve /Reject</h5>
          </span>
        </div>
        {requestList
          ? requestList.map((request, index) => {
              if (
                user &&
                request.userTo &&
                user.email === request.userTo.email &&
                request.state === "pending"
              ) {
                count++;
                return count <= listSize ? (
                  <PendingRequest request={request} key={index} />
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
