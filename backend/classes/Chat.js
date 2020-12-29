// Singleton

class Chat {
    constructor(rooms, users){
        if(Chat.exist){
            return Chat.instance
        }
        Chat.instance = this
        Chat.exist = true
        this.rooms = []
        this.users = []
    }
    addChatRoom(newRoom){
        const roomExist = this.rooms.find(item=>item.roomName === newRoom.roomName)
        if(!roomExist){
            this.rooms.push(newRoom)
        }
    }
    getChatRooms(){
        return this.rooms
    }
    getChatRoomByName(rName){
        const room = this.rooms.find(room=>room.roomName === rName)
        return room
    }
    addUser(user){
        const userExist = this.users.find(item=>item.name === user.name)
        if(!userExist){
            this.users.push(user)
        }
    }
    getUsers(){
        return this.users
    }
    getUserById(id){
        const user = this.users.find(user=>user.id === id)
        return user
    }
    deleteUserFromMainChatById(kickedUserId){
        const indexOfUser = this.users.findIndex(user=>user.id === kickedUserId)
        this.users.splice(indexOfUser,1)
    }
    deleteUserFromAllRoomsById(kickedUserId){
        const rooms = this.getChatRooms()
        rooms.forEach(room=>{
            room.deleteUserFromRoomById(kickedUserId)
        })
        return rooms
    }
}

class ChatRoom {
    constructor(roomName){
        this.roomName = roomName
        this.usersInRoom = []
        this.messages = []
    }
    getChatRoomName(){
        return this.roomName
    }
    getUsersInRoom(){
        return this.usersInRoom
    }
    getMessagesInRoom(){
        return this.messages
    }
    addUserInRoom(newUser){
        const userExist = this.usersInRoom.find(user=>user.id === newUser.id)
        if(!userExist){
            this.usersInRoom.push(newUser)
        }
    }
    addMessage(msg){
        this.messages.push(msg)
    }
    deleteUserFromRoomById(kickedUserId){
        const indexOfUser = this.usersInRoom.findIndex(user=>user.id===kickedUserId)
        this.usersInRoom.splice(indexOfUser, 1)
    }

}

exports.Chat = Chat
exports.ChatRoom = ChatRoom
