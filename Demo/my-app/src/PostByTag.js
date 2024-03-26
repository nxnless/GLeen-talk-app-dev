// file นี้เอาไว้ test การ query แล้วมีการ sort ใหม่
// test query โดยมีการ filter ใช้ในหน้า my post หรือ หน้า on trend
import React, { useState ,useEffect} from 'react';
import axios from 'axios';
import { useParams } from 'react-router';
import { useNavigate , useHistory} from 'react-router-dom';
const Postbytag = ()=>{
    const baseURL = "http://127.0.0.1:5000";
    const navigate = useNavigate();
    const [allPost,setAllpost ] = useState([]);
    const [error, setError] = useState(null);
    const [User_ID,setUserID] = useState('');
    const [Tag , setTag] = useState('');
    //Normal Get
    const para  = useParams();
    const token = para.token
    const tagSearch = para.tag_name

    const getPostbyTag = async () => {
        try {
            const response = await axios.get(baseURL + '/api/AllPostByTag/'+tagSearch);
            setAllpost(response.data);
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    
    getPostbyTag();

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
    const ChangPageToTagPost= async(tag) =>{
        navigate("/getpostbytag/"+tag+"/"+token);
        window.location.reload(false);
    }

    
    const get_all_tag = async () => {
        try {
            const response = await axios.get(baseURL + '/api/tag');
            setTag(response.data);
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    get_all_tag();
    handleGetData();

    let tagElements;
    tagElements = 
    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', padding: '0 10px' }}>
        {Array.isArray(Tag) && Tag.map(t => (
            <div key={t._id}>
                <div  onClick={() => ChangPageToTagPost(t.tag_name)}>{t.tag_name}</div>
            </div>
        ))}
    </div>
    let pnd;
    //To generate data
    if (Array.isArray(allPost)) {
        pnd = allPost.map(p=>(
            <div key={p._id}>
                <p >tag = {p.Tag}</p>
                <p>Post_Key = {p.Post_Key}</p>
                <p>Text = {p.Text_Post}</p>
                <p>User_Id = {p.User_ID}</p>
                <p>Comment count = {p.Comment_Count}</p>
                <p>Liked = {p.Like_Post}</p>
            </div>
        ))
    }
    
    return (
        <>
        <div>
            {tagElements}
            {para.token}
            <p>
                {/* {tag} */}
            </p>
          
            <div>{pnd}</div>
        </div>
        </>
    )
}
export default Postbytag;