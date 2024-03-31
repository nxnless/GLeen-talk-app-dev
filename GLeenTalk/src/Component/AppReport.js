import React, { useState , useEffect} from 'react';
import axios from 'axios';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import './InsertPost.css';
import Tag from './Tag';
import TaskBar from './TaskBar';
const AppReport = ()=>{
    const baseURL = "https://super-pancake-5p4jj6jvxrw3vgpv-5000.app.github.dev/";
    const Report = React.createRef();
    const para  = useParams();
    const navigate = useNavigate();
    const token = para.token
    const GotoHomePage = ()=>{
        navigate("/homepage/" +token)
    }
  
    const SendReport = () =>{
        const data = {
            AppReportMessage:Report.current.value
        }
        console.log(data);
        try {
            axios.post(baseURL+"/api/AppReport ",data).then((response) => {
            });
        }catch (error) {
                console.error('Error fetching data:', error);
        }
        GotoHomePage();
    }


    return (
        <>
        <Tag/>
        <TaskBar/>
        <div class="Post-Font">
            <h1>REPORT</h1>
        </div>
        <div class="container-form">
            <form action="">
            <textarea 
                class="input-form" 
                ref={Report} 
                rows="3" 
                placeholder="Typing..."
            >

            </textarea>
            </form>
        </div>
        <div class="container-button">
            <a type="submit" class="btn" onClick={GotoHomePage}>Back to Feed</a>
            <a type="submit" class="btn" onClick={SendReport}>Send</a>
        </div>
        </>
    )
}
export default AppReport;