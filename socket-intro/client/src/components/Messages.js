import React, {useState, useRef, useEffect} from 'react';

const Messages = (props) => {
    const {socket, username} = props
    const messageRef = useRef(null)
    const [messages, setMessages] = useState([])
    const [message, setMessage] = useState('')


    // ! broadcast message
    useEffect(() => {
        socket.on('broadcast-messages-to-memes', (data) => {
            setMessages((prevMessages) => [...prevMessages, data]);
        });
    }, []);

    // ! Auto scroll to bottom of message box
    useEffect(() => {
        messageRef.current.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    
    const sendMessage = (e) => {
        e.preventDefault();
        socket.emit('message-meme-room', { date: new Date().toLocaleTimeString(), message: message, username: username })
        setMessage('')
    }
    return (
        <div className='chat-box border'>
            <div className='d-flex flex-column p-5'>
                {
                    messages.map((message, idx) => {
                        if (message.username === username) {
                            return (
                                <div key={idx} className='indv-messages user'>
                                    <h3>{message.username} says:</h3>
                                    <p>{message.message}</p>
                                    <span>{message.date}</span>
                                </div>
                            )
                        } else {
                            return (
                                <div key={idx} className='indv-messages'>
                                    <h3>{message.username} says:</h3>
                                    <p>{message.message}</p>
                                    <span>{message.date}</span>
                                </div>
                            )
                        }
                    })
                }
                <div ref={messageRef}></div>
            </div> 
            <div className='message-form'>
                <form onSubmit={sendMessage}>
                    <input type="text" name="message" onChange={(e) => setMessage(e.target.value)} value={message} />
                    <button className='btn btn-primary'>Send</button>
                </form>
            </div>
        </div>
)
}
export default Messages;