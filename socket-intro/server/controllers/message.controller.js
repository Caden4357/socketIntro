const Message = require('../models/message');

module.exports = {
    newMessage: async (req, res) => {
        try{
            const newMessage = await Message.create(req.body);
            res.status(201).json(newMessage);
        }
        catch(err){
            console.log(err);
        }
    }
}