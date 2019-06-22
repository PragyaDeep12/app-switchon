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
