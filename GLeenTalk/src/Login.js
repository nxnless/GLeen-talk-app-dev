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
    const baseURL = "https://super-pancake-5p4jj6jvxrw3vgpv-5000.app.github.dev/";
    const navigate = useNavigate();
    const [errorMassage,setErrorMessage] = useState('');
    const handleLogin = async () => {
        try {
            const login = {
                User_Name:Username.current.value,
                Password:Pass.current.value };

            axios.post(baseURL+'/login',login).then((response) => {
                setToken(response.data.access_token);
           
            });
            if(token){
                navigate("/homepage/"+token);
            }else{
                setErrorMessage("User or Password is incorrect")
            }
            
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
                <div>{errorMassage}</div>
                </div>
            </div>
        </div>
    );
};


export default Login;
