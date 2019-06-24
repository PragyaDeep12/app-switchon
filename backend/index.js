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
const dbName = "requestApp";
io.set("origins", "*:*");

const MongoClient = require("mongodb").MongoClient;
const uri =
  "mongodb+srv://root:1234@cluster0-ditxz.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });

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
      await checkLoginDetails(data.email, data.password)
        .then(user => {
          if (user) {
            // let user = await getUser(data.email);
            socket.emit("loginSuccessful", user);
          } else {
            console.log(loginDetails);
            socket.emit("loginFailed", {
              errorMessage: "Incorrect user id or password"
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
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
      await addUser(data.user);
      console.log(userList);
    } catch (err) {
      socket.emit("signUpFailed", { errorMessage: "Unexpected error occured" });
      console.log(err);
    }
  });
  socket.on("getUserListByDepartment", async data => {
    try {
      await getUserByDept(data.department)
        .then(listUserByDept => {
          socket.emit("newUserList", listUserByDept);
        })
        .catch(err => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  });
  socket.on("newRequest", async data => {
    try {
      console.log(data);
      msgArr.push(data);
      //pushing request on mongo
      await addRequest(data);
      socket.emit("newRequestArrived", data);
    } catch (err) {
      console.log(err);
    }
  });
  socket.on("fetchAllRequests", async data => {
    try {
      await fetchAllRequest()
        .then(msgs => {
          socket.emit("AllRequestsFetched", msgs);
        })
        .catch(err => {
          console.log(err);
        });
    } catch (err) {
      console.error(err);
    }
  });
});

server.listen(process.env.PORT || 4000);
const checkLoginDetails = async (email, password) => {
  var promise = new Promise((resolve, reject) => {
    try {
      MongoClient.connect(
        uri,
        { useNewUrlParser: true },
        async (error, client) => {
          const db = client.db(dbName);
          const collection = db.collection("users");
          var myCursor = await collection.find({
            email: email,
            password: password
          });
          var user;
          if (myCursor)
            myCursor.forEach(user => {
              console.log(user);
              resolve(user);
            });
          else reject(null);
        }
      );
    } catch (error) {
      console.error(error);
      reject(false);
    }
  });
  return promise;
};
const fetchAllRequest = () => {
  var promise = new Promise((resolve, reject) => {
    try {
      MongoClient.connect(
        uri,
        { useNewUrlParser: true },
        async (error, client) => {
          if (error) {
            console.error(error);
          } else {
            const database = client.db(dbName);
           const collection = database.collection("requests");
            var myCursor = await collection.find({});
            var requests = [];
            await myCursor.forEach(elem => {
              console.log(elem);
              if (elem.state === "pending") requests.push(elem);
            });
            // console.log(requests);
            if (collection) {
              resolve(requests);
            } else {
              reject(null);
            }
          }
        }
      );
    } catch (error) {
      reject(null);
    }
  });
  return promise;
};

const getUserByDept = async dept => {
  var promise = new Promise((resolve, reject) => {
    try {
      MongoClient.connect(
        uri,
        { useNewUrlParser: true },
        async (error, client) => {
          if (error) {
            console.error(error);
          } else {
           const database = client.db(dbName);
            const collection = database.collection("users");
            var myCursor = await collection.find({ department: dept });
            var users = [];
            await myCursor.forEach(elem => {
              console.log(elem);
              users.push(elem);
            });
            // console.log(requests);
            if (collection) {
              resolve(users);
            } else {
              reject(null);
            }
          }
        }
      );
    } catch (error) {
      reject(null);
    }
  });
  return promise;
};
// const getUser = async email => {
//   var promise = new Promise((resolve, reject) => {
//     try {
//      client.connect(err=>{
//       const db=client.db(DATABASE_NAME);
//       collection = database.collection("users");
//       var myCursor = await collection.find({ email: email });
//       var user;
//       if (myCursor)
//         myCursor.forEach(user => {
//           resolve(user);
//         });
//       else reject(null);
//       } )
//     }
//     catch (error) {
//       console.error(error);
//       reject(false);
//     }
//   });
//   return promise;
//   // let user = userList.find(user => user.email === email);
//   // return user;
// };
const addUser = user => {
  var promise = new Promise((resolve, reject) => {
    try {
      MongoClient.connect(
        uri,
        { useNewUrlParser: true },
        async (error, client) => {
          const db = client.db(dbName);
          const collection = db.collection("users");
          collection.insertOne(user, res => {
            if (!res) {
              resolve(request);
            } else {
              reject(null);
            }
          });
          // perform actions on the collection object
          // client.close();
        }
      );
    } catch (err) {
      console.log(err);
      reject(err);
    }
  });
  return promise;
};
const addRequest = request => {
  var promise = new Promise((resolve, reject) => {
    try {
      client.connect(err => {
        const db = client.db(dbName);
        const collection = db.collection("requests");
        collection.insertOne(request, res => {
          if (!res) {
            resolve(request);
          } else {
            reject(null);
          }
        });
        // perform actions on the collection object
        // client.close();
      });
    } catch (err) {
      console.log(err);
      reject(err);
    }
  });
  return promise;
};
