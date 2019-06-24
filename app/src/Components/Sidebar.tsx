import React, { useEffect, useState } from "react";
// import SideNav, {
//   Toggle,
//   Nav,
//   NavItem,
//   NavIcon,
//   NavText
// } from "@trendmicro/react-sidenav";
// import LoginContext from "../Contexts/LoginContext";
// import { socket } from "../Dao/SocketDAO";

// import firebase from "firebase";
import User from "../Models/User";
// import { width } from "@material-ui/system";
import { stat } from "fs";
import LoginContext from "../Context/LoginContext";
import { socket } from "../Dao/SocketDAO";
import store from "../Reducer/Store";

export default function Sidebar(props: any) {
  const {
    state: { loginInfo }
  } = React.useContext(LoginContext);
  const { isMobile } = props;
  const [userName, setUserName] = useState();
  const [onlineUsers, setOnlineUsers] = useState<User[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(!isMobile);
  useEffect(() => {
    setIsOpen(!isMobile);
  }, [isMobile]);
  let isMounted = false;
  var user = store.getState().user as User;
  useEffect(() => {
    if (!isMounted) {
      if (user && user.userName) {
        setUserName(user.userName);
      }
    }
  }, []);

  return <div />;
}
