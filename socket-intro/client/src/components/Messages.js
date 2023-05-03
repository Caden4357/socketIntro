import React, {useState, useRef, useEffect, useContext} from 'react';
import MessageForm from './MessageForm';
import { userContext } from '../context/userContext';

const Messages = (props) => {
    const {loggedInUser, setLoggedInUser} = useContext(userContext);
    const {socket, username} = props
    const messageRef = useRef(null)
    const [messages, setMessages] = useState([])

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

    
    return (
        <div className='chat-box border'>
            <div className='d-flex flex-column p-5'>
                {
                    messages.map((message, idx) => {
                        if (message.username === loggedInUser.username) {
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
            <MessageForm socket={socket} username={username}/>
        </div>
)
}
export default Messages;