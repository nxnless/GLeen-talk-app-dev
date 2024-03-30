// file นี้เอาไว้ test การ query แล้วมีการ sort ใหม่
// test query โดยมีการ filter ใช้ในหน้า my post หรือ หน้า on trend
import React, { useState ,useEffect} from 'react';
import axios from 'axios';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';


const Latest = ()=>{
    const baseURL = "http://127.0.0.1:5000";
    const navigate = useNavigate();
    const [allPost,setAllpost ] = useState([]);
    const [User_ID,setUserID] = useState('');
    const [Tag , setTag] = useState('');
    const [allComment,setAllComment] = useState('');
    //Normal Get
    const para  = useParams();
    const token = para.token

    const getAllPost = async () => {
        try {
            const response = await axios.get(baseURL + '/api/GetAllPost');
            setAllpost(response.data);
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    useEffect(() => {
        const getAllPost = async () => {
            try {
                const response = await axios.get(baseURL + '/api/GetAllPost');
                setAllpost(response.data);
                // console.log(response.data);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        const getAllTag = async () => {
            try {
                const response = await axios.get(baseURL + '/api/tag');
                setTag(response.data);
                // console.log(response.data);
            } catch (error) {
                console.error('Error fetching tags:', error);
            }
        };

        getAllPost();
        getAllTag();
    }, []); // Emp




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
    
    const ChangPageTest = async() =>{
        navigate("/mypost/"+token);
    }

    const ChangPageToTagPost= async(tag) =>{
        navigate("/getpostbytag/"+tag+"/"+token);;
    }

    const ChangePageToComment= async(post) =>{
        navigate("/comment/"+post+"/"+token);;
    }


    let pnd;
    let tagElements;
    tagElements = 
    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', padding: '0 10px' }}>
        {Array.isArray(Tag) && Tag.map(t => (
            <div key={t._id}>
                <div  onClick={() => ChangPageToTagPost(t.tag_name)}>{t.tag_name}</div>
            </div>
        ))}
    </div>



function likePostApi(postId, liked) {
    const data = {
        User_ID:User_ID,
        Post_Key:postId
    }
    if (liked) {
        try {
            axios.post(baseURL + "/api/LikePost", data)
                .then(response => {
                    console.log(response.data);
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
                getAllPost();
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    } else {
        axios.delete(baseURL + "/api/DeletePostLike", { data })
        .then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
        getAllPost();
    }
    getAllPost();
    getAllPost();
    getAllPost();
}

// Assuming you have a state to track whether the post is liked or not
const [likedStatus, setLikedStatus] = useState({});

// Function to toggle like status and call likePostApi
const handleLikeClick = (postId) => {
    const updatedLikedStatus = { ...likedStatus };
    updatedLikedStatus[postId] = !updatedLikedStatus[postId]; // Toggle liked status for this post
    setLikedStatus(updatedLikedStatus); // Update liked status in state
    likePostApi(postId, updatedLikedStatus[postId]); // Call API function
}



// Within your JSX, you can call this handleLikeClick function on click
if (Array.isArray(allPost)) {
    pnd = allPost.map(p => (
        <div key={p._id}>
            <p>tag = {p.Tag}</p>
            <p>Post_Key = {p.Post_Key}</p>
            <p>Text = {p.Text_Post}</p>
            <p>User_Id = {p.User_ID}</p>
            <p onClick={() => ChangePageToComment(p.Post_Key)}>Comment count = {p.Comment_Count}</p>
            <p>{p.Like_Post}</p>
            <button onClick={() => handleLikeClick(p._id)}>
                {likedStatus[p._id] ? "Unlike" : "Like"} {/* Display text based on like status */}
            </button>
        </div>
    ))
}
    
    return (
        <>
        <div>
            { tagElements}
            {/* {para.token} */}
            {/* <button onClick={handleGetData}>get data</button> */}

            <h1>{User_ID}</h1>
            <div>{pnd}</div>
        </div>
        </>
    )
}
export default Latest;