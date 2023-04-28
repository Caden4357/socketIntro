const express = require('express');
const app = express();
const cors = require('cors');
const socket = require('socket.io');
const port = 8000;
app.use(cors());
 
const server = app.listen(port, () => {
    console.log(`Listening on port: ${port}`)
});
 
// to initialize the socket, we need to invoke a new instance
//     of socket.io and pass it our express server instance
// We must also include a configuration settings object to prevent CORS errors
const io = socket(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
        allowedHeaders: ['*'],
        credentials: true,
    }
});


let users = []
let usersInMemes = []
io.on("connection", socket => {
    // NOTE: Each client that connects get their own socket id!
    // if this is logged in our node terminal, that means we a new client
    //     has successfully completed the handshake!
    console.log('user connected with this id: ' + socket.id);
    socket.on('disconnect', (data) => {
        console.log('User disconnected', data);
    })

    // We add our additional event listeners right inside this function
    // NOTE: "connection" is a BUILT IN events listener
    // ! Joining main server
    socket.on('join-server', username => {
        let newUser = {id:socket.id, username: username}
        users.push(newUser)

        io.emit('new-user-joined-server', users)
    })

    // ! Joining memes room
    socket.on('join-memes', data => {
        socket.join(data.room)
        let newUser = {id:socket.id, username: data.username}
        usersInMemes.push(newUser)

        io.to(data.room).emit("new-user-joined-memes", usersInMemes)
    })
    // ! Leaving memes room
    socket.on('user-leaving-memes', (userThatLeft) => {
        let updatedUsers = usersInMemes.filter((user) => user.id !== userThatLeft)
        socket.leave('memes')
        usersInMemes = updatedUsers
        io.to('memes').emit('current-users-in-room', usersInMemes)
    })
    
    // ! Messaging meme room
    socket.on('message-meme-room', data => {
        io.emit('broadcast-messages-to-memes', data)
    })
});

