import React, { FormEvent } from "react";

import { useEffect, useContext, useState } from "react";
import LoginContext from "../Context/LoginContext";
import RequestMessage from "../Models/RequestMessage";
import User from "../Models/User";
import store from "../Reducer/Store";
import { NEW_REQUEST_RAISED } from "../AppConstants";
import { newRequest, newRequestArrived } from "../Actions/RequestActions";
import { socket } from "../Dao/SocketDAO";
export default function RequestForm() {
  // var fromUser: User = store.getState().user as User;
  const [fromUser, setFromUser] = useState();
  const [toUser, setToUser] = useState();
  const [dept, setDept] = useState();
  const [deptList, setDeptList] = React.useState([
    "Department1",
    "Department2",
    "Department3",
    "Department4"
  ]);
  const [userList, setUserList]: [Array<User>, any] = useState([]);
  const {
    state: { loginInfo },
    actions: { logout }
  } = React.useContext<any>(LoginContext);

  const [requestMessage, setRequestMessage] = useState<RequestMessage>();
  let isMounted: any = false;

  useEffect(() => {
    if (!isMounted) {
      isMounted = true;

      var user = store.getState().user as User;
      setFromUser(user);

      //Automatically get data on update
      store.subscribe(() => {
        console.log(store.getState().request);
      });
      // Server emits this event when some other client initiates a request
      socket.on("newRequestArrived", (requestArrived: any) => {
        // this line pushes then new message to local reducer
        store.dispatch(newRequestArrived(requestArrived));
      });
      socket.on("newUserList", (data: any) => {
        console.log(data);
        setUserList(data);
      });
    }
  }, []);
  useEffect(() => {
    socket.emit("getUserListByDepartment", dept);
  }, [dept]);

  const onSubmit = async (e: any) => {
    e.preventDefault();
    var req = {
      userFrom: fromUser,
      userTo: JSON.parse(toUser),
      state: "pending"
    };
    setRequestMessage(req);
    // console.log({ userFrom: fromUser, userTo: toUser, state: "pending" });
    if (req) {
      store.dispatch(newRequest(req));
    }
    // if (loginInfo.user && loginInfo.user.userName) {
    //   await setRequestMessage({
    //     ...requestMessage,
    //     userFrom: fromUser,
    //     state: "pending"
    //   });
    // }
    //same if this client want to push message then it pushes data to local reducer ,
    // 2. then reducer pushes to server socket
    //3. then server again emits an event which comes to this socket
    // 4. In server use io.sockets.in(department) to emit request
  };
  return (
    <div className="basic-form">
      <form>
        <div className="input-group mb-3">
          <input
            className="form-control"
            type="text"
            name=""
            id=""
            value={
              fromUser ? (fromUser.name ? fromUser.name.toString() : "") : ""
            }
            // value={
            //   loginInfo.user
            //     ? loginInfo.user.userName
            //       ? loginInfo.user.userName.toString()
            //       : "Pragya"
            //     : "Pragya"
            // }
          />
        </div>
        <div className="row">
          <div className="col">
            <div className="input-group mb-3">
              <select
                className="form-control"
                name="department"
                onChange={e => {
                  setDept(e.currentTarget.value);
                }}
              >
                <option> Department</option>
                {deptList.map((item, index) => {
                  return <option key={index}>{item}</option>;
                })}
              </select>
            </div>
          </div>
          <div className="col">
            <div className="input-group mb-3">
              <select
                className="form-control"
                onChange={e => {
                  if (e.currentTarget) setToUser(e.currentTarget.value);
                  // console.log(requestMessage);
                }}
                name="userTo"
              >
                <option>User</option>
                {userList.map((item, index) => {
                  return (
                    <option key={index} value={JSON.stringify(item)}>
                      {item.name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        </div>
        {/* <div className="input-group mb-5">
          <textarea
            className="form-control"
            name=""
            id=""
            cols={30}
            rows={8}
            placeholder="Enter Your Messgae"
          />
        </div> */}
        <div className="row">
          <div className="col">
            <button className="btn btn-light">Cancel</button>
          </div>
          <div className="col">
            <button
              type="submit"
              className="btn btn-primary"
              onClick={onSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </form>

      <button
        onClick={() => {
          logout();
        }}
      >
        logout
      </button>
    </div>
  );
}
