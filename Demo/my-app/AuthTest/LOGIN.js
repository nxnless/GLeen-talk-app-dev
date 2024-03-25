import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [token, setToken] = useState('');
  const [data, setData] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/login', { username, password });
      setToken(response.data.access_token);
      setLoggedIn(true);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const handleGetData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/protected', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setData(response.data.logged_in_as);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  };

  return (
    <div>
      {loggedIn ? (
        <div>
          <h2>Welcome, {data}!</h2>
          <button onClick={handleGetData}>Get Protected Data</button>
        </div>
      ) : (
        <div>
          <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button onClick={handleLogin}>Login</button>
        </div>
      )}
    </div>
  );
};

export default App;
