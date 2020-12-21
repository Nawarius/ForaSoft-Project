const express = require('express')
const http = require('http')
const socketio = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socketio(server, {cors:{origin:'*'}})

const PORT = process.env.PORT || 4000

let currentSocketRoom = null
let users = []
let rooms = [
    {roomName: 'Собеседование', users:[], messages:[]},
    {roomName: 'JavaScript', users:[], messages:[]}
]

io.on('connection', socket => {
    // socket.emit('message', 'Велкам зе чат')
    // socket.broadcast.emit('message', 'Юзер присоеденился к чату')

    const roomsNames = rooms.map(item => item.roomName)
    io.emit('new room', roomsNames)

    socket.on('join server', username => {
        const user = {
            id:socket.id,
            name:username
        }
        users.push(user)
        io.emit('new user', users)
    })

    socket.on('join room', (roomName) => {
        currentSocketRoom = roomName

        const roomHasExist = rooms.find(room => room.roomName === roomName)
        if(!roomHasExist){
            rooms.push({roomName, users:[], messages:[]})
            const roomsNames = rooms.map(item => item.roomName)
            io.emit('new room', roomsNames)
        }
            socket.join(roomName)
            user = users.find(user => user.id === socket.id)

            const indexOfRoom = rooms.findIndex(room => room.roomName === roomName)
            const userInRoom = rooms[indexOfRoom].users.find(user => user.id == socket.id)

            if(!userInRoom){
                rooms[indexOfRoom].users.push(user)
            }
            //io.to(socket.id).emit('my rooms', roomName)

            io.to(roomName).emit('joined', rooms[indexOfRoom].users)
            if(rooms[indexOfRoom].messages){
                io.to(roomName).emit('message', rooms[indexOfRoom].messages.reverse(), roomName)
            }
    })

    socket.on('message', (message, roomName) => {
        const sender = users.find(user => user.id === socket.id)
        
        const payload = {
            message,
            sender: sender.name,
            date: new Date().toISOString()
        }
        const indexOfRoom = rooms.findIndex(room => room.roomName === roomName)
        rooms[indexOfRoom].messages.push(payload)

        io.to(roomName).emit('message', rooms[indexOfRoom].messages.reverse(), roomName)
    })
    socket.on('invite room', (inviterId, targetId, roomName) => {
        const user = users.find(user=>user.id == inviterId)
        io.to(targetId).emit('accept invite', roomName, user.name)

    })
    socket.on('leave', (roomName) => {
        socket.leave(roomName)
        //users = users.filter(user => user.id !== socket.id)
        //io.emit('new user', users)
        
        console.log(roomName)
        const indexOfRoom = rooms.findIndex(room => room.roomName === roomName)
        rooms[indexOfRoom].users = rooms[indexOfRoom].users.filter(user => user.id !== socket.id)
        io.to(roomName).emit('joined', rooms[indexOfRoom].users)
    })

    socket.on('disconnect', ()=>{
        socket.leave(currentSocketRoom)
        users = users.filter(user => user.id !== socket.id)
        io.emit('new user', users)

        //console.log(currentSocketRoom)

        if(currentSocketRoom){
            const indexOfRoom = rooms.findIndex(room => room.roomName === currentSocketRoom)
            // console.log(indexOfRoom)
            // console.log(rooms)
            rooms[indexOfRoom].users = rooms[indexOfRoom].users.filter(user => user.id !== socket.id)
            io.to(currentSocketRoom).emit('joined', rooms[indexOfRoom].users)
        }
    })

    // WEBRTC
    socket.on("callUser", (data) => {
        io.to(data.userToCall).emit('hey', {signal: data.signalData, from: data.from});
    })

    socket.on("acceptCall", (data) => {
        io.to(data.to).emit('callAccepted', data.signal);
    })

})
//app.use(express.static(path.join(__dirname, '../frontend/public')))

server.listen(PORT, ()=>console.log(`Server has been initialize ${PORT}`))