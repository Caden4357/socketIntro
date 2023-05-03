import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import {BrowserRouter, Link, Route, Routes, useNavigate} from 'react-router-dom'
import './App.css';
import Form from './components/Form';
import Homepage from './components/Homepage';
import Memes from './components/Memes';
import Nav from './components/Nav';
import Login from './components/Login';
import { UserProvider } from './context/userContext';

function App() {
  // notice that we pass a callback function to initialize the socket
  // we don't need to destructure the 'setSocket' function since we won't be updating the socket state
  // const navigate = useNavigate()
  const [socket] = useState(() => io(':8000'));
  const [isConnected, setIsConnected] = useState(socket.connected);

  const [username, setUsername] = useState('')
  

  useEffect(() => {
    // we need to set up all of our event listeners
    // in the useEffect callback function
    console.log('Running');

    socket.on('connect', () => {
      console.log('HERE');
      setIsConnected(true);
    });
    // note that we're returning a callback function
    // this ensures that the underlying socket will be closed if App is unmounted
    // this would be more critical if we were creating the socket in a subcomponent
    return () => {
      socket.disconnect(true, 'id')
    };
  }, []);


  return (
    <div className="App">
      <UserProvider>
        <BrowserRouter>
          <Nav/>
          <Routes>
            {/* <Route path='/' element={<Form socket={socket} username={username} setUsername={setUsername}/>}/> */}
            <Route path='/' element={<Login/>}/>
            <Route path='/homepage' element={<Homepage socket={socket} username={username} setUsername={setUsername}/>}/>
            <Route path='/memes' element={<Memes socket={socket}
            username={username} setUsername={setUsername}/>}/>
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </div>
  );
}

export default App;
