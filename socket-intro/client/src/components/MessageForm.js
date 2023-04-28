import React, {useState} from 'react';

const MessageForm = (props) => {
    const {socket, username} = props
    const [message, setMessage] = useState('')

    const sendMessage = (e) => {
        e.preventDefault();
        socket.emit('message-meme-room', { date: new Date().toLocaleTimeString(), message: message, username: username })
        setMessage('')
    }
    return (
        <div className='message-form'>
        <form onSubmit={sendMessage}>
            <input type="text" name="message" onChange={(e) => setMessage(e.target.value)} value={message} />
            <button className='btn btn-primary'>Send</button>
        </form>
    </div>
)}

export default MessageForm;