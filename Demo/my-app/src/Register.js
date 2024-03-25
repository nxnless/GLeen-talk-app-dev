import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate , useHistory} from 'react-router-dom';
const Register = ()=>{
    const url = "http://127.0.0.1:5000/"
    const Username = React.createRef();
    const Pass = React.createRef();
    const PassConfirm = React.createRef();
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
                window.location.reload(false);
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
            <div>
                <input type = 'text' name = 'Username' ref = {Username} placeholder='Username'/>
                <input type = 'text' name = 'Pass' ref = {Pass} placeholder='Password'/>
                <input type = 'text' name = 'PassConfirm' ref = {PassConfirm} placeholder='Confirm Password'/>
                <button onClick={ SendRegister.bind()  }>Submit</button>  
                <div>
                   {textError}
                </div>
            </div>
           
        </>
    )
}
export default Register;