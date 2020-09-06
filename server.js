const express = require('express');
const path = require('path');
const http = require('http');
const socketio = require('socket.io');
const app = express();
const formatMessage = require('./utils/messages');
const PORT = process.env.PORT || 3000;

const server = http.createServer(app);
const io = socketio(server);

const BOTNAME = "mobot"

//Set static folder
app.use(express.static(path.join(__dirname,'public')))

//Run when a client connects
io.on('connection',(socket)=>{
    console.log("New connection");

    socket.emit('message', formatMessage(BOTNAME,'Wellcome to the ChatZone'));

    //Broeadcast when a user joins 
    socket.broadcast.emit('message',formatMessage(BOTNAME,'A user joined to the chat'));

    //Listen for chat message
    socket.on('chat-message',msg=>{
        io.emit('message',formatMessage('USER',msg));
    })

    socket.on('disconnect',()=>{
        io.emit('message',formatMessage(BOTNAME,'A users has left the chat'))
    })
})


server.listen(PORT,()=>console.log(`Server started on PORT = ${PORT}`))