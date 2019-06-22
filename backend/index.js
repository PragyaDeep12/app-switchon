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
});
server.listen(process.env.PORT || 4000);
