'use strict';

// 3rd Party Resources
//  require("dotenv").config()
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require("path");

// // Esoteric Resources
const logger=require('./middleware/logger');
const errorHandler = require('./errorhandler/500');
const notFound = require('./errorhandler/404');
const login = require('./routers/login');
const signup = require('./routers/signup');
const contactUs=require("./routers/contactUs");
const routerV2=require('./routers/api')
// const cookieParser = require('cookie-parser')
// // Prepare the express app
const app = express();
////////chat socketio///

/////
// App Level MW
app.use(cors());
app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/',(req,res)=>{
  res.send("Application app");
})
// Routes
app.use('/users',signup);
app.use('/users',login);
app.use(contactUs);
// // app.use('/users',authRoutes);
app.use('/api/v2',routerV2);
// // Catchalls

//app.use(express.static(path.join(__dirname,"public")));
app.use("/chat",express.static("public"));

app.use(logger)
app.use(notFound);
app.use(errorHandler);
///////////////////io socket chat///////
const server = require("http").createServer(app);
const io = require("socket.io")(server);

io.on("connection", function(socket){
	socket.on("newuser",function(username){
		socket.broadcast.emit("update", username + " joined the conversation");
	});
	socket.on("exituser",function(username){
		socket.broadcast.emit("update", username + " left the conversation");
	});
	socket.on("chat",function(message){
		socket.broadcast.emit("chat", message);
	});
});

module.exports = {
  server: app,
  start: (PORT) => {
    app.listen(PORT, () => {
      console.log(`Server Up on ${PORT}`);
    });
  },
};