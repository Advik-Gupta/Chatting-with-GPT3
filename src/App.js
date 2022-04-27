import { useState } from 'react';
import './App.css';
import Login from './components/Login';
import Chat from './components/Chat';

function App() {
  const [user, setUser] = useState(null);
  return (
    <div className="App">
      {
        user ? <Chat setUser={setUser} user={user} /> : <Login setUser={setUser} />
      }
    </div>
  );
}

export default App;
