import React, { useEffect, useState } from "react";
// const SideNav=require ("@trendmicro/react-sidenav");
// const NavItem=require('@trendmicro/react-sidenav/NavItem');
// const NavIcon=require('@trendmicro/react-sidenav/NavIcon');
// const NavText=require('@trendmicro/react-sidenav/NavText');
// import LoginContext from "../Contexts/LoginContext";
// import { socket } from "../Dao/SocketDAO";
import SideNav, {
  Toggle,
  Nav,
  NavItem,
  NavIcon,
  NavText
} from "@trendmicro/react-sidenav";
// import firebase from "firebase";
import User from "../Models/User";
// import { width } from "@material-ui/system";
import { stat } from "fs";
import LoginContext from "../Context/LoginContext";
import { socket } from "../Dao/SocketDAO";
import store from "../Reducer/Store";
import { Link } from "react-router-dom";

export default function Sidebar(props: any) {
  const [loggedInUser, setLoggedInUser] = useState();
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
        setLoggedInUser(user);
      }
    }
  }, []);

  return (
    <div>
      <React.Fragment>
        <SideNav
        // onSelect={(selected) => {
        //     const to = '/' + selected;
        //     if (location.pathname !== to) {
        //         history.push(to);
        //     }
        // }}
        >
          <SideNav.Toggle />
          <SideNav.Nav defaultSelected="home">
            <NavItem eventKey="home">
              <NavIcon>
                <i
                  className="fa fa-fw fa-home"
                  style={{ fontSize: "1.75em" }}
                />
              </NavIcon>
              <NavText>Home</NavText>
            </NavItem>
            <NavItem eventKey="devices">
              <NavIcon>
                <i
                  className="fa fa-fw fa-device"
                  style={{ fontSize: "1.75em" }}
                />
              </NavIcon>
              <NavText>Devices</NavText>
            </NavItem>
          </SideNav.Nav>
        </SideNav>
      </React.Fragment>
    </div>
  );
}
