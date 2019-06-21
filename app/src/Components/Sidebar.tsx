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
  useEffect(() => {
    if (!isMounted) {
      if (loginInfo && loginInfo.user && loginInfo.user.userName) {
        setUserName(loginInfo.user.userName);
      }
      // socket.on("latestOnlineUsersArrived", (data: any) => {
      // if (data === "check") {
      // })
      //     firebase
      //       .firestore()
      //       .collection("users")
      //       .where("status", "==", "online")
      //       .get()
      //       .then(docsSnapshot => {
      //         var users: User[] = [];
      //         docsSnapshot.docs.forEach(docs => {
      //           if (docs.data()) {
      //             var user: User = docs.data() as User;
      //             if (loginInfo && loginInfo.user) {
      //               if (loginInfo.user.userName != user.userName) {
      //                 users.push(user);
      //               }
      //             }
      //           }
      //         });
      //         setOnlineUsers(users);
      //       });
      //   }
      // });
    }
  }, []);

  return <div />;
}
