// file นี้เอาไว้ test การ query แล้วมีการ sort ใหม่
// test query โดยมีการ filter ใช้ในหน้า my post หรือ หน้า on trend
import React, { useState ,useEffect} from 'react';
import axios from 'axios';
import { useParams } from 'react-router';
import { useNavigate , useHistory} from 'react-router-dom';
const MyPost = ()=>{
    const baseURL = "http://127.0.0.1:5000";
    const [allPost,setAllpost ] = useState([]);
    const [error, setError] = useState(null);
    const [User_ID,setUserID] = useState('');
    //Normal Get
    const para  = useParams();

    const token = para.token
    const get_all_userPost = async (User_ID) => {
        try {
            const response = await axios.get(baseURL + '/api/PostByUserID/' + User_ID);
            setAllpost(response.data);
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };
    



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
    get_all_userPost(User_ID)
    console.log(User_ID)
    console.log(allPost)
    let pnd;
    //To generate data
    if (Array.isArray(allPost)) {
        pnd = allPost.map(p=>(
            <div key={p._id}>
                <p>tag = {p.Tag}</p>
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
            {para.token}
            {/* <button onClick={handleGetData}>get data</button> */}
            <h1>{User_ID}</h1>
            <div>{pnd}</div>
        </div>
        </>
    )
}
export default MyPost;