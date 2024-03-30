import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Tag from './Component/Tag';
import TaskBar from './Component/TaskBar';
import './Component/Register.css'

const Register = ()=>{
    const url = "http://127.0.0.1:5000/"
    const Username = React.createRef();
    const Pass = React.createRef();
    const PassConfirm = React.createRef();
    const navigate = useNavigate();
    const [RegisState , setRegisState] = useState(null);
    const [textError , showError] = useState('')
    const [checkUsername , setCheckUsername] = useState([]);

    React.useEffect(() => {
        axios.get(url+"/api/alluser").then((response) => {
            setCheckUsername(response.data);
        });
      }, []);


    const SendRegister = ()=>{
        console.log(checkUsername)
        const chk = checkUsername.filter(u=>{
            return u == Username.current.value;
        })
        console.log(chk)
        // console.log(Username.current.value)
        if(Pass.current.value.length >=8){
            if(Pass.current.value === PassConfirm.current.value && chk.length == 0){
                const data = {
                    User_Name:Username.current.value,
                    Password:Pass.current.value
                }
                try {
                axios.post(url+"/api/CreateAccount",data).then((response) => {
                    setRegisState(response.data);
                });
                }catch (error) {
                    console.error('Error fetching data:', error);
                }
                
                console.log(data)
                showError("")
                navigate("/login");
            }
            else if(chk.length >0){
                showError("username is used")
            }
            else{
               showError("Error")
            }
        }else{
            showError("Your Password not long enough 8 letter")
        }
       
        
    }

    return (
        <>
        <TaskBar/>
            <div class="wrapper">
                <div class="from-box ">
                <h2  style={{ marginTop: '-85px', marginRight:'50px'}}>Registration</h2>
                <div style={{ marginTop: '60px', marginRight:'50px'}}>
                    <div class="input-box">
                    <input type="username" ref = {Username} required/>
                    <label style={{ marginTop: '-10px'}}>Username</label>
                    </div>
                    <div class="input-box">
                    <input type="password" ref = {Pass} required/>
                    <label style={{ marginTop: '-10px'}}>Password</label>
                    </div>
                    <div class="input-box">
                    <input type="password" ref = {PassConfirm} required/>
                    <label style={{ marginTop: '-10px' , marginLeft:'35px'}}>Confrim Password</label>
                    </div>
                    <div class="remember-forgot">
                    <label><input type="checkbox"/>
                        I agree to the terms & conditions</label>
                    </div>
                    <button type="submit" class="btn" style={{ marginTop: '-10px'}} onClick={ SendRegister.bind()} >Register</button>
                    <div class="login-register" >
                    <p>Already have an account? <a href="/login" class="login-link">Login</a></p>
                    <p>{textError}</p>
                    </div>
                </div>
                </div>
           </div>
        </>
    )
}
export default Register;