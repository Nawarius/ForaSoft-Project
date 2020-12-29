const express = require('express')
const http = require('http')
const socketio = require('socket.io')
const {Chat, ChatRoom} = require('./classes/Chat')
const {User} = require('./classes/User')
const {Message} = require ('./classes/Message')

const app = express()
const server = http.createServer(app)
const io = socketio(server, {cors:{origin:'*'}})

const PORT = process.env.PORT || 4000

let currentSocketRoom = null
let users = []

const ForaChat = new Chat()

const roomInterview = new ChatRoom('Собеседование')
const roomJS = new ChatRoom('JavaScript')

ForaChat.addChatRoom(roomInterview)
ForaChat.addChatRoom(roomJS)

io.on('connection', socket => { 

    const rooms = ForaChat.getChatRooms()
    io.emit('new room', rooms)

    socket.on('new room', roomName => {
        ForaChat.addChatRoom(new ChatRoom(roomName))
        const rooms = ForaChat.getChatRooms()
        io.emit('new room', rooms)
    })
    
    socket.on('join server', username => {
        ForaChat.addUser(new User(socket.id, username))
        const users = ForaChat.getUsers()
        io.emit('new user', users)
    })

    socket.on('join room', roomName => {
        socket.join(roomName)

        const currentRoom = ForaChat.getChatRoomByName(roomName)
        const currentUser = ForaChat.getUserById(socket.id)
        
        currentRoom.addUserInRoom(currentUser)

        io.to(roomName).emit('joined', currentRoom.getUsersInRoom())

        if(currentRoom.getMessagesInRoom()){
            io.to(roomName).emit('message', currentRoom.getMessagesInRoom().reverse(), roomName)
        }
    })

    socket.on('message', (message, roomName) => {
        const sender = ForaChat.getUserById(socket.id)

        const newMessage = new Message(sender, message)
        const currentRoom = ForaChat.getChatRoomByName(roomName)
        console.log(ForaChat.getUsers())
        currentRoom.addMessage(newMessage)

        io.to(roomName).emit('message', currentRoom.getMessagesInRoom().reverse(), roomName)
    })

    socket.on('invite room', (inviterId, targetId, roomName) => {
        const user = users.find(user=>user.id == inviterId)
        io.to(targetId).emit('accept invite', roomName, user.name)

    })
    socket.on('leave', (roomName) => {
        socket.leave(roomName)
        const currentRoom = ForaChat.getChatRoomByName(roomName)
        
        currentRoom.deleteUserFromRoomById(socket.id)

        io.to(roomName).emit('joined', currentRoom.getUsersInRoom())
    })
    socket.on('disconnecting', ()=>{
        
    })
    socket.on('disconnect', ()=>{
    //    ForaChat.deleteUserFromMainChatById(socket.id)
    //    const users = ForaChat.getUsers()
    //    io.emit('new user', users)
        
        const updatedRooms = ForaChat.deleteUserFromAllRoomsById(socket.id)

        updatedRooms.forEach(room=>{
            const users = room.getUsersInRoom()
            io.to(room.roomName).emit('joined', users)
        })
    })

    // WEBRTC
    socket.on("callUser", (data) => {
        console.log(socket.id)
        console.log(data.from)
        console.log(data.userToCall)
        io.to(data.userToCall).emit('hey', {signal: data.signalData, from: data.from});
    })

    socket.on("acceptCall", (data) => {
        io.to(data.to).emit('callAccepted', data.signal);
    })

})
//app.use(express.static(path.join(__dirname, '../frontend/public')))

server.listen(PORT, ()=>console.log(`Server has been initialize ${PORT}`))