// app.js
// 1.loginProvider->getUserDetails will fetch userDetails=->change the username in socket->

// client code----------------------------------

// socket.emit(join,{department:"dept1"});

// server code-----------------------------------
// socket.on(join,data=>{
//     var dept=data.dept;
//     socket.join(dept);//the room of the dept

// })
// socket.on("newformrequest", data=>{
// message=data.message
// department=data.department
// //for realtime notification
// io.sockets.in(department).emit("newfromreques",data)
// //for database storage
// save database
// })

// client code----------------------------------
// socket.on("newMessage", data=>{

// })
//******************git url ----- https://git.heroku.com/fast-plateau-10106.git */
//******************deployment url -----https://fast-plateau-10106.herokuapp.com/ | */
const express = require("express")();
var server = require("http").Server(express);
const io = require("socket.io")(server);
express.get("/*", function(req, res) {
  res.sendFile(path.join(__dirname, "./public", "index.html"));
  // res.sendFile("index.html", { root: path.join(__dirname, "public") });
});
const loginDetails = [];
const userList = [];
const msgArr = [];
io.set("origins", "*:*");
io.on("connection", socket => {
  console.log("connected");

  //connected
  socket.username = "Anonymous";

  //when username changes from clint
  socket.on("change_username", data => {
    socket.username = data.username;
    console.log(socket.username);
    //when user has a username he is online so add to online users here
  });
  //called when clients disconnected
  socket.on("disconnect", data => {
    console.log("disconnected");
  });
  socket.on("loginUser", async data => {
    try {
      let result = await checkLoginDetails(data.email, data.password);
      if (result) {
        let user = await getUser(data.email);
        socket.emit("loginSuccessful", user);
      } else {
        console.log(loginDetails);
        socket.emit("loginFailed", {
          errorMessage: "Incorrect user id or password"
        });
      }
    } catch (err) {
      socket.emit("loginFailed", { errorMessage: "Unexpected Error Occured" });

      console.log(err);
    }
  });
  socket.on("signUpUser", async data => {
    try {
      await loginDetails.push({
        email: data.user.email,
        password: data.password
      });
      await userList.push(data.user);
      socket.emit("signUpSuccessful", data.user);
      console.log(userList);
    } catch (err) {
      socket.emit("signUpFailed", { errorMessage: "Unexpected error occured" });
      console.log(err);
    }
  });
  socket.on("getUserListByDepartment", data => {
    try {
      let listUserByDept = [
        { userName: "a", email: "a@b.com", name: "aa" },
        { userName: "b", email: "b@b.com", name: "abba" },
        { userName: "c", email: "c@b.com", name: "acca" }
      ];
      socket.emit("newUserList", listUserByDept);
    } catch (err) {
      console.log(err);
    }
  });
  socket.on("newRequest", data => {
    try {
      console.log(data);
      msgArr.push(data);
      socket.emit("newRequestArrived", data);
    } catch (err) {
      console.log(err);
    }
  });
});

server.listen(process.env.PORT || 4000);
const checkLoginDetails = async (email, password) => {
  if (
    loginDetails.find(
      user => user.email === email && user.password === password
    )
  )
    return true;
  else return false;
};

const getUser = async email => {
  let user = userList.find(user => user.email === email);
  return user;
};
