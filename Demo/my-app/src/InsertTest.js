import React, { useState } from 'react';
import axios from 'axios';

const InsertTest = ()=>{
    const url = "http://127.0.0.1:5000/"
    const Username = React.createRef();
    const Pass = React.createRef();
    const PassConfirm = React.createRef();
    const [textError , showError] = useState('')


    const Insert = ()=>{
                const data = {
                    user_name:Username.current.value,
                    pass:Pass.current.value
                }
                try {
                    axios.post(url+"register",data).then((response) => {
                    setRegisState(response.data);
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