// file นี้เอาไว้ test การ query แล้วมีการ sort ใหม่
// test query โดยมีการ filter ใช้ในหน้า my post หรือ หน้า on trend
import React, { useState ,useEffect} from 'react';
import axios from 'axios';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import './images/logo_w60.png'
import './Style.css'

const TaskBar = ()=>{
    const baseURL = "http://127.0.0.1:5000";
    const navigate = useNavigate();
    const para  = useParams();
    const token = para.token
    const [User_ID,setUserID] = useState(null);
    
    const fetchData = async () => {
        try {
            const response = await axios.get(baseURL+'/protected', {
                headers: { Authorization: `Bearer ${token}` }
            });

            // If response is not empty or null, update userID state
            if (response && response.data && response.data.logged_in_as) {
                setUserID(response.data.logged_in_as);
                console.log(response.data.logged_in_as)
            } else {
                console.log('Response is empty or not as expected.');
                setUserID(null)
            }
        } catch (error) {
            console.error('Failed to fetch data:', error);
        }
    };
    useEffect(() => {
        
    
        fetchData(); // Call the fetchData function when the component mounts
    }, []); // Empty dependency array means this effect runs only once when the component mounts
    console.log(User_ID)
    const GotoMyPost = () => {
        if(User_ID != null) {
            navigate("/mypost/" + token);
        } else {
            navigate("/login");
        }
    }
      const GotoHomePage = ()=>{
        navigate("/homepage/" +token)
    }

    const GotoAppReport = ()=>{
        navigate("/appreport")
    }

    const GotoTrend = ()=>{
        navigate("/trend/" +token)
    }
    return (
        <>
            <div class="header">
                <div class="logo" onClick={GotoHomePage}>
                
                    <img src={('https://scontent-bkk1-1.xx.fbcdn.net/v/t39.30808-6/433054557_723093289986758_3451699542292854960_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=5f2048&_nc_ohc=RIrvmCUzk-IAX-bvaUQ&_nc_ht=scontent-bkk1-1.xx&oh=00_AfC8hslWezZ0IvwWWUj4Om__b5dlTsB2iFtFSYv-yjXxBg&oe=660E0FDB')} alt="Logo"/>
                </div>
                <div class="text_l">  
                <a>
                   <a onClick={GotoHomePage}>   Gleen Talk  </a>

                    <a onClick={GotoAppReport}>&nbsp;AppReport   </a>
                </a>
                   
                </div>
            <div class = "middle"  onClick={GotoHomePage}>
                Latest
            </div>
            <div class = "middle" onClick={GotoTrend}>
                Trend
            </div>
            <div class="text_r">
                <a onClick={GotoMyPost}>My Post</a>
            </div>
  </div>
        </>
    )
}
export default TaskBar;