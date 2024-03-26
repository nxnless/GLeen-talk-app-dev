import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';

const InsertPost = ()=>{
    const baseURL = "http://127.0.0.1:5000/"
    const TextPost = React.createRef();
    const [RegisState , setRegisState] = useState(null);
    const [userID,setUserID] = useState('');
    const [allTag , setTag] = useState([]);
    const para  = useParams();
    const token = para.token
    const [selectedOption, setSelectedOption] = useState("General");
    React.useEffect(() => {
        axios.get(baseURL+"/api/tag").then((response) => {
            setTag(response.data);
        });
      }, []
      );
    console.log(allTag);

    const handleGetData = async () => {
        try {
        const response = await axios.get(baseURL+'/protected', {
            headers: { Authorization: `Bearer ${token}` }
        });
            setUserID(response.data.logged_in_as);
        } catch (error) {
        console.error('Failed to fetch data:', error);
        }
    };
    handleGetData();
    console.log(userID);

    const handleSelectChange = (event) => {
        setSelectedOption(event.target.value);
        console.log(selectedOption)
    };

    let tagElements = 
    <div>
      <h2>Select an Tag:</h2>
      <select value={selectedOption} onChange={handleSelectChange}>
        {Array.isArray(allTag) && allTag.map(t => (
            <option value={t.tag_name}>{t.tag_name}</option>
        ))}
      </select>
      <p>Selected option: {selectedOption}</p>
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
                setRegisState(response.data);
           
            });
        }catch (error) {
                console.error('Error fetching data:', error);
        }
        window.location.reload(false);
    }


    return (
        <>
            <div>
                <input type = 'text' name = 'Username' ref = {TextPost} placeholder='Post Something'/>
                <button onClick={sendPost.bind()} >Submit</button>  
                {userID}
                {tagElements}
            </div>
           
        </>
    )
}
export default InsertPost;