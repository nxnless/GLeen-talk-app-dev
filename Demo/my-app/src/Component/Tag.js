// file นี้เอาไว้ test การ query แล้วมีการ sort ใหม่
// test query โดยมีการ filter ใช้ในหน้า my post หรือ หน้า on trend
import React, { useState ,useEffect} from 'react';
import axios from 'axios';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import './Style.css'

const Tag = ()=>{
    const baseURL = "http://127.0.0.1:5000";
    const navigate = useNavigate();
    const [allPost,setAllpost ] = useState([]);
    const [User_ID,setUserID] = useState('');
    const [Tag , setTag] = useState('');
    const [allComment,setAllComment] = useState('');
    const para  = useParams();
    const token = para.token

    useEffect(() => {
        const getAllTag = async () => {
            try {
                const response = await axios.get(baseURL + '/api/tag');
                setTag(response.data);
                // console.log(response.data);
            } catch (error) {
                console.error('Error fetching tags:', error);
            }
        };
        getAllTag();
    }, [])
    const ChangPageToTagPost= async(tag) =>{
        navigate("/getpostbytag/"+tag+"/"+token);;
        window.location.reload(false);
        window.location.reload(false);
    }

    let tagElements;
    tagElements = 
    <div className="wrapper-navigator" >
    {Array.isArray(Tag) && Tag.map(t => (
        <div className="from-box" key={t._id} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', padding: '0 10px' }}>
            <button type="button" className="button-feed" onClick={() => ChangPageToTagPost(t.tag_name)}>{t.tag_name}</button>
        </div>
    ))}
    </div>

    return (
        <>
        <div>
            { tagElements}
        </div>
        </>
    )
}
export default Tag;