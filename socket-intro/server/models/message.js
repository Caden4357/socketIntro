const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({

    username:{
        type:String,
        required:[true, 'Username is required']
    },
    messageBody:{
        type:String,
        required:[true, 'Message Body is required']
    },
    room:{
        type:String,
        required:[true, 'Room is required']
    }
}, {timestamps:true})

const Message = mongoose.model('Message', MessageSchema);

module.exports = Message