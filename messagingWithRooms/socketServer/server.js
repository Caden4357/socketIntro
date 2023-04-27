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


io.on("connection", socket => {
    console.log('socket id: ' + socket.id);
    socket.on('disconnect', () => {
        console.log('User disconnected');
    })
    socket.on("connect_error", (err) => {
        console.log(`connect_error due to ${err.message}`);
      });
    socket.on("join-server", user => {
        console.log('here');
        console.log(user)
        // send a message with "messages" to ALL clients EXCEPT for the one that emitted the
    	//     "event_from_client" event
        // io.emit('send-messages', messages)
        socket.broadcast.emit("new-user-joined-server", user);
    });
});





