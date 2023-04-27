import React, { useState, useEffect } from 'react';
import './Messages.css'
const Memes = (props) => {
    const { socket, username } = props
    const [usersInMemes, setUsersInMemes] = useState([])
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])
    useEffect(() => {
        console.log('DSSSSSS');
        socket.on("new-user-joined-memes", data => {
            // console.log('#######', data);
            setUsersInMemes(data)
        })
        socket.on('broadcast-messages-to-memes', data => {
            // console.log('#########',data);
            setMessages(prevState => [...prevState, data])

        })
    }, [])

    const sendMessage = (e) => {
        e.preventDefault();
        socket.emit('message-meme-room', {message:message, username:username})
        setMessage('')
    }
    return (
        <div>
            <h1>Welcome to memes: {username}</h1>
            <h2>Chat with any users in this channel:</h2>
            {
                usersInMemes.map((user) => (
                    <p key={user.id}>user: {user.username}</p>
                ))
            }
            <div className='chat-box'>
                <div className='d-flex flex-column'>
                    {
                        messages.map((message, idx) => {
                            if(message.username === username){
                                return (
                                    <div key={idx} className='indv-messages user'>
                                        <h3>{message.username}</h3>
                                        <p>{message.message}</p>
                                    </div>
                                )
                            }else{
                                return (
                                    <div key={idx} className='indv-messages'>
                                        <h3>{message.username}</h3>
                                        <p>{message.message}</p>
                                    </div>
                                )
                            }
})
                    }
                </div>
                <div className='message-form'>
                    <form onSubmit={sendMessage}>
                        <input type="text" name="message" onChange={(e) => setMessage(e.target.value)} value={message}/>
                        <button className='btn btn-primary'>Send</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Memes;