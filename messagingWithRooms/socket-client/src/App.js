import {useEffect, useState} from 'react'
import io from 'socket.io-client'
import './App.css';
import DisplayMessages from './components/DisplayMessage';
import Form from './components/Form';

function App() {
  // notice that we pass a callback function to initialize the socket
  // we don't need to destructure the 'setSocket' function since we won't be updating the socket state
  const [socket] = useState(() => io(':8000'));
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [id, setId] = useState('')
  const [username, setUsername] = useState('')

  console.log(socket);
  useEffect(() => {
    // we need to set up all of our event listeners
    // in the useEffect callback function
    
    console.log('Running');
    socket.on('connect', () => {
      console.log("HERE");
    })
    // note that we're returning a callback function
    // this ensures that the underlying socket will be closed if App is unmounted
    // this would be more critical if we were creating the socket in a subcomponent
    return () => socket.disconnect(true);
  }, []);

  const submitHandler = (e) => {
    e.preventDefault()
    console.log('heresss');
    socket.emit('join-server', 'username')
  }
  return (
    <div className="App">
      <h2>You need a username to join the server</h2>
      <form onSubmit={submitHandler}>
          <label>Username: </label>
          <input type="text" onChange={(e) => setUsername(e.target.value)} value={username}/>
          <button>Join</button>
      </form>
    </div>
  );
}

export default App;
