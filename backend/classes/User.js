
class User {
    constructor(id,name){
        this.id = id
        this.name = name
        this.chatRooms = []
    }
    addToRoom(room){
        this.chatRooms.push(room)
    }
}

class Admin extends User {
    constructor(id, name, isAdmin){
        this.id = id
        this.name = name
        this.isAdmin = isAdmin
    }
}

exports.User = User