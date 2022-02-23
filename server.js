// Load required modules
var http    = require("http");              // http server core module
var express = require("express");           // web framework external module
var serveStatic = require('serve-static');  // serve static files
var socketIo = require('socket.io');
           // web socket external module
var easyrtc = require("easyrtc"); 
var app = express();  
const server = http.createServer(app);            // EasyRTC external module
const { Server } = require("socket.io");
const io = require('socket.io')(server, {
    cors: {
        origin: "http://localhost",
        methods: ["GET", "POST"],
        transports: ['websocket', 'polling'],
        credentials: true
    },
    allowEIO3: true
});
// Set process name
process.title = "node-easyrtc";

// Get port or default to 8081
var port = process.env.PORT || 8081;

// Setup and configure Express http server. Expect a subfolder called "static" to be the web root.

app.use(express.static('public'));


// Start Express http server
 var webServer = server.listen(port);

// Start Socket.io so it attaches itself to Express server
var socketServer = io.listen(webServer, {"log level":1});

var myIceServers = [
 // {url:'stun:stun01.sipphone.com'},
//  {url:'stun:stun.ekiga.net'},
  {url:'stun:stunserver.org'},
  {url:'stun:stun.fwdnet.net'},
  {url:'stun:stun.ideasip.com'},

  {url:'stun:stun.schlund.de'},
  {url:'stun:stun.l.google.com:19302'},
  {url:'stun:stun1.l.google.com:19302'},
  {url:'stun:stun2.l.google.com:19302'},
  {url:'stun:stun3.l.google.com:19302'},
  {url:'stun:stun4.l.google.com:19302'},
  {
      url: 'turn:numb.viagenie.ca',
      credential: 'muazkh',
      username: 'webrtc@live.com'
  },

   // {"url":"stun:stun1.l.google.com:19302"},
   // {"url":"stun:stun2.l.google.com:19302"},
   // {"url":"stun:stun3.l.google.com:19302"}
    // {
    //   "url":"turn:[ADDRESS]:[PORT]",
    //   "username":"[USERNAME]",
    //   "credential":"[CREDENTIAL]"
    // },
    // {
    //   "url":"turn:[ADDRESS]:[PORT][?transport=tcp]",
    //   "username":"[USERNAME]",
    //   "credential":"[CREDENTIAL]"
    // }
];
easyrtc.setOption("appIceServers", myIceServers);
easyrtc.setOption("logLevel", "debug");
easyrtc.setOption("demosEnable", false);

// Overriding the default easyrtcAuth listener, only so we can directly access its callback
easyrtc.events.on("easyrtcAuth", function(socket, easyrtcid, msg, socketCallback, callback) {
    easyrtc.events.defaultListeners.easyrtcAuth(socket, easyrtcid, msg, socketCallback, function(err, connectionObj){
        if (err || !msg.msgData || !msg.msgData.credential || !connectionObj) {
            callback(err, connectionObj);
            return;
        }

        connectionObj.setField("credential", msg.msgData.credential, {"isShared":false});

        console.log("["+easyrtcid+"] Credential saved!", connectionObj.getFieldValueSync("credential"));

        callback(err, connectionObj);
    });
});

// To test, lets print the credential to the console for every room join!
/*easyrtc.events.on("roomJoin", function(connectionObj, roomName, roomParameter, callback) {
    console.log("["+connectionObj.getEasyrtcid()+"] Credential retrieved!", connectionObj.getFieldValueSync("credential"));
    easyrtc.events.defaultListeners.roomJoin(connectionObj, roomName, roomParameter, callback);
});*/

// Start EasyRTC server
var rtc = easyrtc.listen(app, socketServer, null, function(err, rtcRef) {
    console.log("Initiated");

    rtcRef.events.on("roomCreate", function(appObj, creatorConnectionObj, roomName, roomOptions, callback) {
        console.log("roomCreate fired! Trying to create: " + roomName);

        appObj.events.defaultListeners.roomCreate(appObj, creatorConnectionObj, roomName, roomOptions, callback);
    });
});

//listen on port
/*webServer.listen(port, function () {
    console.log('listening on http://localhost:' + port);
});*/

