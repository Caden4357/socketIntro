import React, {useState, useEffect} from 'react';
import { Link, useNavigate} from 'react-router-dom';

const Homepage = (props) => {
    const navigate = useNavigate()
    const {socket, username, setUsername} = props
    const [users, setUsers] = useState([])
    const [usersThatLeft, setUsersThatLeft] = useState([])
    const [input, setInput] = useState('')
    const [messageRecieved, setMessageRecieved] = useState([])

    useEffect(() => {
        socket.on('new-user-joined-server', users => {
            console.log(users);
            setUsers(users)
            // alert(`${newUser} Joined the server`)
        })
    
        socket.on('event_to_all_other_clients', (data) => {
        console.log('$$$$$$$$$$$', data);
        setMessageRecieved([...messageRecieved, data])
        // setMessageList(data)
        })
        socket.on('current-users-in-room', data => {
            console.log(data.userThatLeft);
            setUsersThatLeft([...usersThatLeft, data.userThatLeft])
            // const updatedUsers = users.filter((user) => user.username !== data.userThatLeft)
            // console.log(updatedUsers);
            setUsers(data.users)
        })

    }, [])


    const joinMemesRoom = () => {
        socket.emit('join-memes', {room:'memes', username:username })
        navigate('/memes')
    }


    const submitHandler = (e) => {
        e.preventDefault();
        setInput('')
        socket.emit('event_from_client', { message: input, username: username });
    }
    const leaveRoom = () => {
        socket.emit('user-left', username)
        navigate('/')
    }

    return (
        <div>
            <h1>Welcome to the server {username}</h1>
            <h2>Which room would you like to go to?</h2>
            <button onClick={joinMemesRoom} className='btn btn-dark'>Memes</button>
            <button className='btn btn-dark'>Politics</button>
            <button className='btn btn-dark'>Science & Technology</button>
            <button className='btn btn-dark'>Sports</button>


            {/* <h2>Users that left</h2>
            {   
                usersThatLeft.length>0?
                usersThatLeft.map((user) => (
                    <p>{user} Left the chat</p>
                )):
                null
            } */}
            {/* <h2>Users that are in the chat</h2>
            {
                users.map((user, idx)=> (
                    <p key={idx}>{user.username} Joined the server</p>
                ))
            }
            <h2>Send a message: </h2>
            <form onSubmit={submitHandler}>
                <label>Message:</label>
                <input type="text" value={input} onChange={(e) => setInput(e.target.value)}/>
                <button>Send Message</button>
            </form>
            {
                messageRecieved.length>0?
                messageRecieved.map((message) => (
                    <p>{message.username} Says: {message.message}</p>
                )):
                null
            }
            <button onClick={leaveRoom}>Leave Room</button> */}
        </div>
)}

export default Homepage;