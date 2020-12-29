
class Message{
    constructor(sender, message){
        this.message = message
        this.sender = sender
        this.date = new Date().toISOString()
    }
}

exports.Message = Message