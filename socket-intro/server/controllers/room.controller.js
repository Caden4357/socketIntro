const Room = require('../models/room');

module.exports = {
    createNewRoom: async (req, res) => {
        try{
            const newRoom = await Room.create(req.body);
            res.status(201).json(newRoom)
        }
        catch(err){
            res.status(400).json(err)
        }
    },
    joinRoom: async (req, res) => {
        try{
            const roomToJoin = await Room.findOneAndUpdate(
                {roomName:req.params.roomName}, 
                {$push: {users_in_room: req.body}}, 
                {new:true, runValidators:true}
            );
            console.log(roomToJoin);
            res.status(201).json(roomToJoin);
        }
        catch(err){
            res.status(400).json(err)
        }
    },
    leaveRoom: async (req, res) => {
        try{
            const leavingRoom = await Room.findOneAndUpdate(
                {roomName:req.params.roomName}, 
                {$pull: {users_in_room:req.body}},
                {new:true, runValidators:true}
            )
            res.status(201).json(leavingRoom);
        }
        catch(err){
            res.status(400).json(err)
        }
    }
}