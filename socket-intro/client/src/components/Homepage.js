import React, {useState, useEffect, useContext} from 'react';
import { Link, useNavigate} from 'react-router-dom';
import {userContext} from '../context/userContext'
import axios from 'axios';
const Homepage = (props) => {
    const navigate = useNavigate()
    const {loggedInUser, setLoggedInUser} = useContext(userContext);
    
    const {socket, username} = props
    const [users, setUsers] = useState([])
    const uuid = window.localStorage.getItem('uuid');
    // console.log(uuid);
    useEffect(() => {
        axios.get(`http://localhost:8000/api/loggedInUser/${uuid}`)
            .then((res) => {
                // console.log(res);
                setLoggedInUser(res.data)
            })
            .catch((err) => {
                console.log(err);
            })
        socket.on('new-user-joined-server', users => {
            console.log(users);
            setUsers(users)
        })
        

    }, [])


    const joinMemesRoom = () => {
        socket.emit('join-memes', {room:'memes', username:loggedInUser.username })
        navigate('/memes')
    }

    return (
        <div>
            <h1>Welcome to Chat Socket {loggedInUser.username}</h1>
            <h2>Which room would you like to go to?</h2>
            <button onClick={joinMemesRoom} className='btn btn-dark'>Memes</button>
            <button className='btn btn-dark'>Politics</button>
            <button className='btn btn-dark'>Science & Technology</button>
            <button className='btn btn-dark'>Sports</button>
        </div>
)}

export default Homepage;