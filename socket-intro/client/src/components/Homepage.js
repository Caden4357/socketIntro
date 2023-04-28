import React, {useState, useEffect} from 'react';
import { Link, useNavigate} from 'react-router-dom';

const Homepage = (props) => {
    const navigate = useNavigate()
    const {socket, username} = props
    const [users, setUsers] = useState([])
    const [usersThatLeft, setUsersThatLeft] = useState([])
    const [messageRecieved, setMessageRecieved] = useState([])

    useEffect(() => {
        socket.on('new-user-joined-server', users => {
            console.log(users);
            setUsers(users)
        })

    }, [])


    const joinMemesRoom = () => {
        socket.emit('join-memes', {room:'memes', username:username })
        navigate('/memes')
    }

    return (
        <div>
            <h1>Welcome to the server {username}</h1>
            <h2>Which room would you like to go to?</h2>
            <button onClick={joinMemesRoom} className='btn btn-dark'>Memes</button>
            <button className='btn btn-dark'>Politics</button>
            <button className='btn btn-dark'>Science & Technology</button>
            <button className='btn btn-dark'>Sports</button>
        </div>
)}

export default Homepage;