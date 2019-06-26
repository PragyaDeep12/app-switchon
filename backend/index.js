const io = require("socket.io")();
const Promise = require("promise");
const dbName = "requestApp";
io.set("origins", "*:*");

const MongoClient = require("mongodb").MongoClient;
const uri =
  "mongodb+srv://root:1234@cluster0-ditxz.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
var db;
var collection;
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
      checkLoginDetails(data.email, data.password)
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
          socket.emit("loginFailed", {
            errorMessage: "Incorrect user id or password"
          });
        });
    } catch (err) {
      socket.emit("loginFailed", { errorMessage: "Unexpected Error Occured" });

      console.log(err);
    }
  });
  socket.on("signUpUser", async data => {
    try {
      addUser(data.user)
        .then(user => {
          socket.emit("signUpSuccessful", data.user);
        })
        .catch(err => {
          console.log(err);

          socket.emit("signUpFailed", {
            errorMessage: "Unexpected error occured"
          });
        });
    } catch (err) {
      socket.emit("signUpFailed", { errorMessage: "Unexpected error occured" });
      console.log(err);
    }
  });
  socket.on("getUserListByDepartment", async data => {
    try {
      getUserByDept(data.department)
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
      //pushing request on mongo
      addRequest(data)
        .then(() => {
          io.sockets.emit("newRequestArrived", data);
        })
        .catch(err => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  });
  socket.on("updateRequest", data => {
    try {
      updateRequest(data.request, data.state).then(res => {
        if (!res) {
        } else {
          fetchAllRequest().then(requests => {
            if (data.state === "approved")
              io.sockets.emit("approvedRequest", data.request);
            else if (data.state === "rejected")
              io.sockets.emit("rejectedRequest", data.request);

            io.sockets.emit("AllRequestsFetched", requests);
          });
        }
      });
    } catch (err) {
      console.log(err);
    }
  });
  socket.on("fetchAllRequests", async data => {
    try {
      fetchAllRequest()
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

io.listen(process.env.PORT || 4000);
const checkLoginDetails = async (email, password) => {
  var promise = new Promise((resolve, reject) => {
    try {
      MongoClient.connect(
        uri,
        { useNewUrlParser: true },
        async (error, client) => {
          if (error) {
            console.log(error);
          } else {
            db = client.db(dbName);
            collection = db.collection("users");
            var myCursor = await collection.find({
              email: email,
              password: password
            });
            //close connection

            var user;
            console.log(await myCursor.count());
            if ((await myCursor.count()) < 1) {
              console.log("here");
              reject(null);
            }
            if (myCursor)
              myCursor.forEach(user => {
                console.log(user);
                //process user and make it ready for frontend because
                // mongo user has an "_id "which cant be processed in frontend
                if (user) {
                  var tempUser = {
                    department: user.department,
                    email: user.email,
                    name: user.name,
                    password: user.password,
                    uid: null,
                    userName: user.userName
                  };
                  //  myCursor.close();
                  resolve(tempUser);
                }
              });
            else reject(null);
          }
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
            db = client.db(dbName);
            collection = db.collection("requests");
            var myCursor = await collection.find({}).sort({ time: -1 });
            //close connection

            var requests = [];
            await myCursor.forEach(elem => {
              console.log(elem);
              requests.push(elem);
            });
            // console.log(requests);
            if (collection) {
              myCursor.close();
              resolve(requests);
            } else {
              reject(null);
            }
          }
        }
      );
    } catch (error) {
      MongoClient.close();
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
            db = client.db(dbName);
            collection = db.collection("users");
            var myCursor = await collection.find({ department: dept });
            //close connection

            var users = [];

            await myCursor.forEach(elem => {
              console.log(elem);
              users.push(elem);
            });
            // console.log(requests);
            if (collection) {
              myCursor.close();
              resolve(users);
            } else {
              reject(null);
            }
          }
        }
      );
    } catch (error) {
      MongoClient.close();
      reject(null);
    }
  });
  return promise;
};

const addUser = user => {
  var promise = new Promise((resolve, reject) => {
    try {
      MongoClient.connect(
        uri,
        { useNewUrlParser: true },
        async (error, client) => {
          db = client.db(dbName);
          collection = db.collection("users");
          collection.insertOne(user, res => {
            if (!res) {
              resolve(user);
              //close connection
            } else {
              reject(null);
              //close connection
            }
          });
          // perform actions on the collection object
          //
        }
      );
    } catch (err) {
      MongoClient.close();
      console.log(err);
      reject(err);
    }
  });
  return promise;
};
const addRequest = request => {
  var promise = new Promise((resolve, reject) => {
    try {
      MongoClient.connect(
        uri,
        { useNewUrlParser: true },
        async (error, client) => {
          db = client.db(dbName);
          collection = db.collection("requests");
          collection.insertOne(request, res => {
            if (!res) {
              resolve(request);
              //close connection
            } else {
              reject(null);
              //close connection
            }
          });
          // client.db().options("")
          // perform actions on the collection object
          //
        }
      );
    } catch (err) {
      MongoClient.close();
      console.log(err);
      reject(err);
    }
  });
  return promise;
};
const updateRequest = (request, state) => {
  var promise = new Promise((resolve, reject) => {
    try {
      MongoClient.connect(uri, { useNewUrlParser: true }, (error, client) => {
        if (error) {
          console.error(error);
        } else {
          db = client.db(dbName);
          collection = db.collection("requests");
          collection.updateOne(
            { time: request.time },
            { $set: { state: state } },
            res => {
              if (!res) {
                resolve(request);
              } else {
                reject(null);
              }
            }
          );
        }
      });
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
  return promise;
};
