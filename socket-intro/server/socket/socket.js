let users = []
let usersInMemes = []
let {io} = require('../server')


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
        let newUser = { id: socket.id, username: username }
        users.push(newUser)

        io.emit('new-user-joined-server', users)
    })

    // ! Joining memes room
    socket.on('join-memes', data => {
        socket.join(data.room)
        console.log(data);
        let newUser = { id: socket.id, username: data.username }
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
        console.log(data);
        io.emit('broadcast-messages-to-memes', data)
    })
});