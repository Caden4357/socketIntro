import React, {useState, useContext} from 'react';
import { userContext } from '../context/userContext';
import axios from 'axios';
const MessageForm = (props) => {
    const {loggedInUser, setLoggedInUser} = useContext(userContext);
    const {socket, username} = props
    const [message, setMessage] = useState('')

    const sendMessage = (e) => {
        e.preventDefault();
        const finalMessage = {
            // date: new Date().toLocaleTimeString(), 
            messageBody: message, 
            username: loggedInUser.username,
            room:'memes'
        }
        axios.post('http://localhost:8000/api/newMessage', finalMessage, {withCredentials:true})
            .then((res) => {
                console.log(res);
                socket.emit('message-meme-room', res.data)
            })
            .catch((err) => {
                console.log(err);
            })
        setMessage('')
    }
    return (
        <div className='message-form'>
        <form onSubmit={sendMessage}>
            <div className='input-btn-wrapper'>
                <input type="text" name="message" onChange={(e) => setMessage(e.target.value)} value={message} />
                <button className='button'>Send</button>
            </div>
        </form>
    </div>
)}

export default MessageForm;