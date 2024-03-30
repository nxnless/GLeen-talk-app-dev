import React, { useState , useEffect} from 'react';
import axios from 'axios';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import './Component/InsertPost.css';
import Tag from './Component/Tag';
import TaskBar from './Component/TaskBar';
const InsertPost = ()=>{
    const baseURL = "http://127.0.0.1:5000/"
    const TextPost = React.createRef();
    const [userID,setUserID] = useState('');
    const [allTag , setTag] = useState([]);
    const para  = useParams();
    const navigate = useNavigate();
    const token = para.token
    const [selectedOption, setSelectedOption] = useState("General");
    React.useEffect(() => {
        axios.get(baseURL+"/api/tag").then((response) => {
            setTag(response.data);
        });
      }, []
      );
    console.log(allTag);
    const GotoHomePage = ()=>{
        navigate("/homepage/" +token)
    }
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
        fetchData();
    }); 


    const handleSelectChange = (event) => {
        setSelectedOption(event.target.value);
        console.log(selectedOption)
    };

    let tagElements = 
    <div>
        <select className="custom-select" value={selectedOption} onChange={handleSelectChange}>
            {Array.isArray(allTag) && allTag.map(t => (
                <option key={t.tag_name} value={t.tag_name}>{t.tag_name}</option>
            ))}
            </select>
    </div>

    
    const sendPost = () =>{
        const data = {
            Text_Post:TextPost.current.value,
            User_ID:userID,
            Tag:selectedOption
        }
        console.log(data);
        try {
            axios.post(baseURL+"/api/InsertPost",data).then((response) => {
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
            <diV>{tagElements}</diV>
            <div class="Post-Font">
            <h1>POST</h1>
            </div>
                <div class="container-form">
                    <form action="">
                    <textarea class="input-form" ref = {TextPost} rows="3" placeholder="Typing..."></textarea>
                    </form>
                </div>
                <div class="container-button">
                    <a type="submit" class="btn" onClick={GotoHomePage}>Back to Feed</a>
                    <a type="submit" class="btn" onClick={sendPost.bind()}>Post</a>
            </div>
        </>
    )
}
export default InsertPost;