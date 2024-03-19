import React, { useState } from 'react';
import axios from 'axios';

const InsertTest = ()=>{
    const url = "http://127.0.0.1:5000/"
    const Username = React.createRef();
    const Pass = React.createRef();
    const PassConfirm = React.createRef();
    const [Post , setPostState] = useState(null)
    const [textError , showError] = useState('')
    // asdasd

    const Insert = ()=>{
                const data = {
                    Username:Username.current.value,
                    Password:Pass.current.value
                }
                try {
                    axios.post(url+"/api/CreateAccount",data).then((response) => {
                    setPostState(response.data);
                });
                }catch (error) {
                    console.error('Error fetching data:', error);
                }
                
            }
  
    return (
        <>
            <div>
                <input type = 'text' name = 'Username' ref = {Username} placeholder='Username'/>
                <input type = 'text' name = 'Pass' ref = {Pass} placeholder='Password'/>
                <input type = 'text' name = 'PassConfirm' ref = {PassConfirm} placeholder='Confirm Password'/>
                <button onClick={ Insert.bind()  }>Submit</button>  
                <div>
                   {textError}
                </div>
            </div>
           
        </>
    )
}
export default InsertTest;