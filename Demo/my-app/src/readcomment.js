// file นี้เอาไว้ test การ query แล้วมีการ sort ใหม่
// test query โดยมีการ filter ใช้ในหน้า my post หรือ หน้า on trend
import React, { useState ,useEffect} from 'react';
import axios from 'axios';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';


const ReadComment = ()=>{
    const baseURL = "http://127.0.0.1:5000";
    const TextComment = React.createRef();
    const navigate = useNavigate();
    const [Post,setPost ] = useState([]);
    const [Tag , setTag] = useState('');
    const [User_ID,setUserID] = useState('');
    const [allComment,setAllComment] = useState('');

    //Normal Get
    const para  = useParams();
    const token = para.token;
    const one_post = para.post_key;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(baseURL+'/protected', {
                    headers: { Authorization: `Bearer ${token}` }
                });
    
                // If response is not empty or null, update userID state
                if (response && response.data && response.data.logged_in_as) {
                    setUserID(response.data.logged_in_as);
                } else {
                    // Do something if response is empty or not as expected
                    console.log('Response is empty or not as expected.');
                    navigate("/login"); // Navigate to the login page
                }
            } catch (error) {
                console.error('Failed to fetch data:', error);
            }
        };
    
        fetchData(); // Call the fetchData function when the component mounts
    }, []); // Empty dependency array means this effect runs only once when the component mounts
    
    useEffect(() => {
        const getAllPost = async () => {
            try {
                const response = await axios.get(baseURL +'/api/GetOnePost/'+one_post);
                setPost(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };
    
        const getAllTag = async () => {
            try {
                const response = await axios.get(baseURL + '/api/tag');
                setTag(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching tags:', error);
            }
        };
    
        getAllPost();
        getAllTag();
    }, []); // Empty dependency array means this effect runs only once when the component mounts
   
    console.log(Post.Post_Key)
    const getComment = async () => {
        try {
            const response = await axios.get(baseURL + '/api/GetCommentByPostKey/'+Post.Post_Key);
            setAllComment(response.data);
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    useEffect(() => {
        const getComment = async () => {
            try {
                const response = await axios.get(baseURL +'/api/GetComment/'+Post.Post_Key);
                setAllComment(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };
        getComment();
        console.log(allComment);
    }, []); // Emp

    console.log(allComment);
    const sendComment = () =>{
        const data = {
            Text_Comment:TextComment.current.value,
            User_ID:User_ID,
            Post_Key:Post.Post_Key
        }
        console.log(data);
        try {
            axios.post(baseURL+"/api/InsertComment",data).then((response) => {
            });
         
        }catch (error) {
                console.error('Error fetching data:', error);
        }
        getComment();
    }

 // Access the first (and only) element in the array
    const pnd = <div key={Post._id}>
                <p>tag = {Post.Tag}</p>
                <p>Post_Key = {Post.Post_Key}</p>
                <p>Text = {Post.Text_Post}</p>
                <p>User_Id = {Post.User_ID}</p>
                <p>Comment count = {Post.Comment_Count}</p>
                <p>{Post.Like_Post}</p>
            </div>
        ;
    

    let commentInThisPost;
    if (Array.isArray(allComment)) {
        commentInThisPost = allComment.map(p => (
            <div key={p._id}>
                <p>tag = {p.Tag}</p>
                <p>Post_Key = {p.Post_Key}</p>
                <p>Text = {p.Text_Post}</p>
                <p>User_Id = {p.User_ID}</p>
                <p>{p.Like_Post}</p>
            
            </div>
        ))
    }

    return (
        <>  <div>{pnd}</div>
            <div>
                <input type = 'text' ref = {TextComment} placeholder='Post Something'/>
                <button onClick={sendComment.bind()} >Submit</button>  
            </div>
            <div>
                {commentInThisPost}
            </div>
        </>
    );
    
}
export default ReadComment;