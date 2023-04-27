import React, {useEffect, useState} from 'react';

const Form = (props) => {
    const [message, setMessage] = useState('')
    const {messages, setMessages, socket} = props
    

    const submitHandler = (e) => {
        e.preventDefault();
        setMessages([...messages, message])

    }

    return (
        <div>
            <form onSubmit={submitHandler}>
                <label>Message: </label>
                <input type="text" onChange={(e) => setMessage(e.target.value)} value={message}/>
            </form>
        </div>
)}

export default Form;