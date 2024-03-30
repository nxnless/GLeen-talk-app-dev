import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate} from 'react-router-dom';
import TaskBar from './Component/TaskBar';
import './Component/Login.css'
const Login = () => {
    const [token, setToken] = useState('');
    const [data,setData] = useState('');
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
        axios.post(url+'/login',login).then((response) => {
            setToken(response.data.access_token);
            navigate("/homepage/"+response.data.access_token);
        });
            
        const response = await axios.get(url+'/protected', {
            headers: { Authorization: 'Bearer '+{ token}  }
        });
        setData(response.data.logged_in_as);
      
        } catch (error) {
        console.error('Login failed:', error);
            }
        };


    const gotoRegister = ()=>{
        navigate("/register/")
    }
    return (
        <div>
        <TaskBar/>
            <div class="wrapper">
                <div class="from-box">
                <h2>Login</h2>
                <div style={{ marginTop: '60px', marginRight:'50px' }}>
                    <div class="input-box" >
                    <span class="icon"><ion-icon name="person-circle-sharp"></ion-icon></span>
                    <input type="text" name = "username" placeholder="Username" ref={Username} />
                    <label style={{ marginTop: '-10px' }}>Username</label>
                    </div>
                    <div class="input-box">
                    <span class="icon"><ion-icon name="lock-closed"></ion-icon></span>
                    <input type="password" name="password" placeholder="Password" ref={Pass}/>
                    <label style={{ marginTop: '-10px'}}>Password</label>
                    </div>
                    <div class="remember-forgot">
                    <label><input type="checkbox"/>
                        Remember me</label>
                    </div>
                    <button class="btn"  style={{ marginTop: '-10px'}} onClick={handleLogin}>Login</button>
                    <div class="login-register">
                        <button  style={{ marginTop: '10px'}} class="btn"onClick= {gotoRegister}>Register</button>
                    </div>
                </div>
                
                </div>
            </div>
        </div>
    );
};


export default Login;