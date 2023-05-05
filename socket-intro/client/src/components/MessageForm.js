import React, {useState, useContext} from 'react';
import { userContext } from '../context/userContext';
const MessageForm = (props) => {
    const {loggedInUser, setLoggedInUser} = useContext(userContext);
    const {socket, username} = props
    const [message, setMessage] = useState('')

    const sendMessage = (e) => {
        e.preventDefault();
        socket.emit('message-meme-room', { date: new Date().toLocaleTimeString(), message: message, username: loggedInUser.username })
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