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
// let messages = []
let users = []
let usersInMemes = []
io.on("connection", socket => {
    // NOTE: Each client that connects get their own socket id!
    // if this is logged in our node terminal, that means we a new client
    //     has successfully completed the handshake!
    console.log('user connected with this id: ' + socket.id);
    socket.on('disconnect', (data) => {
        console.log('User disconnected', data);
        // let newUsers = users.map((user) => {
        //     if(user.id === )
        // })
    })
    socket.on('user-left', (userThatLeft) => {
        console.log('HEREEE');
        console.log(userThatLeft);
        let updatedUsers = users.filter((user) => user.username !== userThatLeft)
        users = updatedUsers
        console.log(users);
        io.emit('current-users-in-room', {users:users, userThatLeft:userThatLeft})
    })
    // We add our additional event listeners right inside this function
    // NOTE: "connection" is a BUILT IN events listener
    socket.on("event_from_client", message => {
        console.log('MESSAGE', message);
        // messages.push(message)
        // send a message with "data" to ALL clients EXCEPT for the one that emitted the
    	//     "event_from_client" event
        io.emit("event_to_all_other_clients", message);
    });
    socket.on('join-server', username => {
        console.log('USERNAME', username);
        let newUser = {id:socket.id, username: username}
        users.push(newUser)
        console.log(users);

        io.emit('new-user-joined-server', users)
    })

    socket.on('join-memes', data => {
        // console.log(data.room);
        socket.join(data.room)
        // console.log(socket);
        let newUser = {id:socket.id, username: data.username}
        usersInMemes.push(newUser)

        io.to(data.room).emit("new-user-joined-memes", usersInMemes)
    })
    socket.on('message-meme-room', data => {
        console.log(data);
        io.emit('broadcast-messages-to-memes', data)
    })
});

