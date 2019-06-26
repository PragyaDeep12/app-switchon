import React, { FormEvent } from "react";

import { useEffect, useContext, useState } from "react";
import LoginContext from "../Context/LoginContext";
import RequestMessage from "../Models/RequestMessage";
import User from "../Models/User";
import store from "../Reducer/Store";
import { NEW_REQUEST_RAISED } from "../AppConstants";
import { newRequest, newRequestArrived } from "../Actions/RequestActions";
import { socket } from "../Dao/SocketDAO";
import { updateUser, getCurrentUser } from "../Actions/UserActions";
import { openSnackbar } from "./CustomSnackBar";
export default function RequestForm() {
  // var fromUser: User = store.getState().user as User;
  const [fromUser, setFromUser] = useState<User>(getCurrentUser());
  const [toUser, setToUser] = useState();
  const [dept, setDept] = useState();
  const [message, setMessage] = useState();
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
      // var user = store.getState().user as User;
      // setFromUser(user);
      // //Automatically get data on update
      // store.subscribe(() => {
      //   var user = store.getState().user as User;
      //   //console.log(user);
      //   if (user !== undefined && user.name) {
      //     setFromUser(user);
      //   }
      //   //console.log(fromUser);
      // });

      // socket.on("newRequestArrived", (requestArrived: any) => {
      //   // this line pushes then new message to local reducer
      //   store.dispatch(newRequestArrived(requestArrived));
      // });
      socket.on("newUserList", (data: any) => {
        //  //console.log(data);
        setUserList(data);
      });
    }
  }, []);
  useEffect(() => {
    socket.emit("getUserListByDepartment", { department: dept });
  }, [dept]);

  const onSubmit = async (e: any) => {
    e.preventDefault();
    //console.log(toUser);
    if (fromUser && toUser && dept && message) {
      var req = {
        userFrom: fromUser,
        userTo: JSON.parse(toUser),
        state: "pending",
        department: dept,
        time: new Date(),
        message: message
      };
      setRequestMessage(req);
      if (req) {
        store.dispatch(newRequest(req));
        setMessage("");
        openSnackbar({ message: "request sent" });
      }
    } else {
      openSnackbar({ message: "one or more fields might be empty" });
    }

    // //console.log({ userFrom: fromUser, userTo: toUser, state: "pending" });

    //same if this client want to push message then it pushes data to local reducer ,
    // 2. then reducer pushes to server socket
    //3. then server again emits an event which comes to this socket
    // 4. In server use io.sockets.in(department) to emit request
  };
  return (
    <div className="basic-form">
      <form>
        <div className="input-group mb-3">
          <div className="form-control">
            {fromUser
              ? fromUser.name
                ? "FROM : " + fromUser.name.toString()
                : ""
              : ""}
          </div>
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
                  if (fromUser && fromUser.department !== item)
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
                  // //console.log(requestMessage);
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
        <div className="input-group mb-3">
          <textarea
            value={message}
            cols={30}
            rows={5}
            placeholder="Enter your message"
            className="form-control"
            onChange={e => {
              setMessage(e.target.value);
            }}
          />
        </div>
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
    </div>
  );
}
