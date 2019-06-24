import React, {
  useState,
  useContext,
  FormEvent,
  useReducer,
  useEffect
} from "react";
import { Link } from "react-router-dom";
import LoginContext from "../Context/LoginContext";
import userReducer from "../Reducer/UserReducer";
import { CREATE_USER } from "../AppConstants";
// import LoginContext from "../Contexts/LoginContext";
//  } from "react-router-dom";
export default function SignupComponent(props: any) {
  const {
    state,
    actions: { signUp }
  } = useContext<any>(LoginContext);
  const [deptList, setDeptList] = useState([
    "Department1",
    "Department2",
    "Department3",
    "Department4"
  ]);
  const [userName, setUserName] = useState();
  const [email, setEmail] = useState();
  const [name, setName] = useState();
  const [password, setPassword] = useState();
  const [rPassword, setRPassword] = useState();
  const [department, setDepartment] = useState();
  const [error, setError] = useState<{ type: any; error_message: any }>({
    type: null,
    error_message: null
  });
  // const [userState, dispatch] = useReducer(userReducer, []);
  // useEffect(() => {
  //   console.log(userState);
  // }, [userState]);
  const formSubmit = async (e: FormEvent) => {
    console.log("here");
    e.preventDefault();
    if (
      userName == null ||
      email == null ||
      password == null ||
      name == null ||
      department == null
    ) {
      alert("one or more fields might be empty");
    } else {
      if (password !== rPassword) {
        alert("password and alert password do not match");
      } else {
        //final signup
        // props.onCreateUser(
        console.log("here");
        let user = {
          userName: userName,
          email: email,
          name: name,
          department: department,
          password: password
        };

        await signUp(user);
        console.log();
        // );
      }
    }
  };

  return (
    <div>
      <div className="basic-form">
        <h2 className="">Register</h2>
        <form
          onSubmit={e => {
            formSubmit(e);
          }}
        >
          <div className="input-group mb-3">
            <input
              type="text"
              name="userName"
              onChange={e => {
                setUserName(e.target.value);
              }}
              className="form-control"
              placeholder="Username"
            />
          </div>
          <div className="input-group mb-3">
            <input
              type="text"
              name="name"
              onChange={e => {
                setName(e.target.value);
              }}
              className="form-control"
              placeholder="Full Name"
            />
          </div>
          <div className="input-group mb-3">
            <input
              type="email"
              name="email"
              onChange={e => {
                setEmail(e.target.value);
              }}
              className="form-control"
              placeholder="Email-Id"
            />
          </div>
          <div className="input-group mb-3">
            <select
              className="form-control"
              onChange={e => {
                setDepartment(e.target.value);
              }}
            >
              <option>Select Department</option>
              {deptList.map((item, index) => {
                return <option key={index}>{item}</option>;
              })}
            </select>
          </div>
          <div className="input-group mb-3">
            <input
              type="password"
              name="password"
              id="password"
              onChange={e => {
                setPassword(e.target.value);
              }}
              className="form-control"
              placeholder="Password"
            />
          </div>
          <div className="input-group mb-3">
            <input
              type="password"
              name="rPassword"
              onChange={e => {
                setRPassword(e.target.value);
              }}
              className="form-control"
              placeholder="Repeat Password"
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={formSubmit}
          >
            Register
          </button>
        </form>
        <Link to="/login" className="hyperlink">
          Login
        </Link>
      </div>
    </div>
  );
}
