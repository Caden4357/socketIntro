import React, {useState, useEffect} from 'react';

const DisplayMessages = (props) => {
    const {messages, setMessages, socket} = props
    return (
        <div>
            {/* <p>Message: {messages}</p> */}
            {
                messages.map((message, idx) => (
                    <div key={idx}>
                        <p>Message: {message}</p>
                    </div>
                ))
            }

        </div>
)}

export default DisplayMessages;