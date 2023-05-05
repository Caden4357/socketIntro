import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { userContext } from '../context/userContext';
import axios from 'axios';
const UsersInRoom = (props) => {
    const navigate = useNavigate()
    const {loggedInUser, setLoggedInUser} = useContext(userContext);
    const { socket, usersInMemes, setUsersInMemes } = props;
    
    const leaveRoom = () => {
        const updatedUsers = usersInMemes.map((user) => user.username !== loggedInUser.username)
        console.log(updatedUsers);
        setUsersInMemes(updatedUsers)
        socket.emit('user-leaving-memes', socket.id)
        navigate('/homepage')
    }
    // ! if you have different tabs open to test this will not work because the local storage is shared between tabs on the browser have to open a whole new browser for it to work
    const uuid = window.localStorage.getItem('uuid');
    console.log(uuid);
    useEffect(() => {
        axios.get(`http://localhost:8000/api/loggedInUser/${window.localStorage.getItem('uuid')}`)
            .then((res) => {
                // console.log(res);
                setLoggedInUser(res.data)
            })
            .catch((err) => {
                console.log(err);
            })
        

    }, [])

    return (
        <div>
            <h1>Welcome to memes: {loggedInUser.username}</h1>
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