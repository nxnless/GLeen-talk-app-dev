import React, { useState } from 'react';
import axios from 'axios';

import { useNavigate} from 'react-router-dom';
const Login = () => {
    const [token, setToken] = useState('');
    const [data,setData] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);
    const Username = React.createRef();
    const Pass = React.createRef();
    const url = "http://127.0.0.1:5000/";
    const navigate = useNavigate();
    const handleLogin = async () => {
        try {
        const login = {
            User_Name:Username.current.value,
            Password:Pass.current.value
        };
        console.log(login);
        axios.post(url+'/login',login).then((response) => {
            setToken(response.data.access_token);
            // Chage here to go to home page (latest)
            navigate("/homepage/"+response.data.access_token);
            setLoggedIn(true);
        });
            
        const response = await axios.get(url+'/protected', {
            headers: { Authorization: 'Bearer '+{ token}  }
        });
        setData(response.data.logged_in_as);
      
        } catch (error) {
        console.error('Login failed:', error);
        }
    };

    const handleGetData = async () => {
        try {
        const response = await axios.get(url+'/protected', {
            headers: { Authorization: `Bearer ${token}` }
        });
        setData(response.data.logged_in_as);
        } catch (error) {
        console.error('Failed to fetch data:', error);
        }
    };

    const gotoRegister = ()=>{
        navigate("/register/")
    }
    return (
        <div>
        {loggedIn ? (
            <div>
            <h2>Welcome, {data}!</h2>
            <button onClick={handleGetData}>Get Protected Data</button>
            </div>
        ) : (
            <div>
            <input type="text" name = "username" placeholder="Username" ref={Username}  />
            <input type="password" name="password" placeholder="Password" ref={Pass} />
            <button onClick={handleLogin}>Login</button>
                <div onClick={gotoRegister}>Register</div>
            </div>
        )}
        </div>
    );
};


export default Login;
