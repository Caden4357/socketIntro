import React, { useState, useEffect, useRef } from 'react';
import './Messages.css'
import Messages from './Messages';
import UsersInRoom from './UsersInRoom';
const Memes = (props) => {
    const { socket, username } = props
    const [usersInMemes, setUsersInMemes] = useState([])
    
    // ! New user joined memes
    useEffect(() => {
        socket.on('new-user-joined-memes', data => {
            console.log(data);
            console.log('firing NUJM');
            setUsersInMemes(data)
        })
    }, [])

    // ! Update users in room after user has left
    useEffect(() => {
        socket.on('current-users-in-room', data => {
            console.log(data);
            console.log('firing CUIN');
            setUsersInMemes(data)
        })
    }, [])

    return (
        <div>
            <UsersInRoom username={username} socket={socket} usersInMemes={usersInMemes} setUsersInMemes={setUsersInMemes}/>
            <Messages socket={socket} username={username}/>
        </div>
    )
}

export default Memes;