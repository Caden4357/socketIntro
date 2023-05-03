import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UsersInRoom = (props) => {
    const navigate = useNavigate()
    const { socket, username, usersInMemes, setUsersInMemes } = props;
    
    const leaveRoom = () => {
        const updatedUsers = usersInMemes.map((user) => user.username !== username)
        console.log(updatedUsers);
        setUsersInMemes(updatedUsers)
        socket.emit('user-leaving-memes', socket.id)
        navigate('/homepage')
    }

    return (
        <div>
            <h1>Welcome to memes: {username}</h1>
            <button onClick={leaveRoom}>Leave Memes</button>
            <h2>Chat with any users in this channel:</h2>
            {
                usersInMemes.map((user, id) => (
                    <p key={id}>user: {user.username}</p>
                ))
            }
        </div>
    )
}

export default UsersInRoom;