"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const wss = new ws_1.WebSocketServer({ port: 8080 });
let userCount = 0;
//for broadcasting 
let allSockets = [];
//jb bhi is wss(port 8080) pe koi connection ayega to side vala funtion call kr dena and usko ek socket de dena
//every socket will be new socket 10 bar connection -> 10 new socket  responding back to same browser
//when i send message 10 time - 10 socket will be created but response will go on same browser(port number)
wss.on("connection", (socket) => {
    allSockets.push(socket); //to broadcast all users
    userCount = userCount + 1;
    console.log("User connected #" + userCount);
    //when ever message comes to the server 
    socket.on("message", (message) => {
        console.log("message received: " + message.toString());
        allSockets.forEach((clientSocket) => {
            clientSocket.send("Message: " + message.toString());
        });
    });
});
