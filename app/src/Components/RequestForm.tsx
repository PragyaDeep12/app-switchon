import React, { FormEvent } from "react";

import { useEffect, useContext, useState } from "react";
import LoginContext from "../Context/LoginContext";
import RequestMessage from "../Models/RequestMessage";
import User from "../Models/User";
export default function RequestForm() {
  const [deptList, setDeptList] = React.useState([
    "Department1",
    "Department2",
    "Department3",
    "Department4"
  ]);
  const [userList, setUserList]: [Array<User>, any] = useState([]);
  const {
    state: { loginInfo }
  } = React.useContext(LoginContext);

  const [requestMessage, setRequestMessage] = useState<RequestMessage>();
  let isMounted: any = false;
  useEffect(() => {
    if (!isMounted) {
      isMounted = true;
    }
  }, []);
  const onChange = (e: any) => {
    setRequestMessage({ ...requestMessage, [e.target.name]: e.target.value });
    console.log(requestMessage);
  };
  const onSubmit = (e: any) => {
    e.preventDefault();
    if (loginInfo.user && loginInfo.user.userName) {
      setRequestMessage({
        ...requestMessage,
        userFrom: loginInfo.user,
        state: "pending"
      });
    }
    console.log(requestMessage);
  };
  return (
    <div className="basic-form">
      <form onSubmit={onSubmit}>
        <div className="input-group mb-3">
          <input
            className="form-control"
            type="text"
            name=""
            id=""
            value={
              loginInfo.user
                ? loginInfo.user.userName
                  ? loginInfo.user.userName.toString()
                  : "Pragya"
                : "Pragya"
            }
          />
        </div>
        <div className="row">
          <div className="col">
            <div className="input-group mb-3">
              <select
                className="form-control"
                name="department"
                onChange={onChange}
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
              <select className="form-control" onChange={onChange}>
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
        <div className="input-group mb-5">
          <textarea
            className="form-control"
            name=""
            id=""
            cols={30}
            rows={8}
            placeholder="Enter Your Messgae"
          />
        </div>
        <div className="row">
          <div className="col">
            <button className="btn btn-light">Cancel</button>
          </div>
          <div className="col">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
