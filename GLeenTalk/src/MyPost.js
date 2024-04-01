// file นี้เอาไว้ test การ query แล้วมีการ sort ใหม่
// test query โดยมีการ filter ใช้ในหน้า my post หรือ หน้า on trend
import React, { useState ,useEffect} from 'react';
import axios from 'axios';
import { useParams } from 'react-router';
import { useNavigate , useHistory} from 'react-router-dom';
import Tag from './Component/Tag';
import TaskBar from './Component/TaskBar';
const MyPost = ()=>{
    const baseURL = "https://super-pancake-5p4jj6jvxrw3vgpv-5000.app.github.dev";
    const navigate = useNavigate();
    const [allPost,setAllpost ] = useState([]);
    const [error, setError] = useState(null);
    const [User_ID,setUserID] = useState('');
    //Normal Get
    const para  = useParams();

    const token = para.token


    const handleDeletePost = async (post_key) => {
        try {
            const response = await axios.delete(baseURL+'/api/DeletePost', {
                data: { Post_Key: post_key }
            });
        } catch (error) {
        }
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

    const get_all_userPost = async () => {
        console.log(User_ID);
        try {
            const response = await axios.get(baseURL + '/api/PostByUserID/' + User_ID);
            setAllpost(response.data);
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
};

        useEffect(() => {
            const fetchDataAndPosts = async () => {
                fetchData();
                get_all_userPost(); 
            };

            fetchDataAndPosts();
            get_all_userPost(); 
        }, []);
        get_all_userPost();
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
                        get_all_userPost();
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
                get_all_userPost();
            }
            get_all_userPost();
       
        }
        const ChangPageToTagPost= async(tag) =>{
            navigate("/getpostbytag/"+tag+"/"+token);;
        }
    
        const ChangePageToComment= async(post) =>{
            navigate("/comment/"+post+"/"+token);;
        }
        // Assuming you have a state to track whether the post is liked or not
        const [likedStatus, setLikedStatus] = useState({});
        
        // Function to toggle like status and call likePostApi
        const handleLikeClick = (postId) => {
            fetchData();
            if(User_ID){
                const updatedLikedStatus = { ...likedStatus };
                updatedLikedStatus[postId] = !updatedLikedStatus[postId]; // Toggle liked status for this post
                setLikedStatus(updatedLikedStatus); // Update liked status in state
                likePostApi(postId, updatedLikedStatus[postId]); // Call API function
            }else{
                navigate("/login");
            }
            
        }
        
            const gotoinsertpost = ()=>{
                fetchData();
                if(User_ID){
                    navigate("/insertpost/"+token)
                }
                else{
                    navigate("/login");
                }
                
            }
        const pnd = (
            <div className="box">
              <div className="container">
                <div id="post-list" style={{ marginTop: '100px' }}>
                  {Array.isArray(allPost) && allPost.map(post => (
                    <div className="post" key={post._id}>
                      <a className="report-button" onClick={() => handleDeletePost(post.Post_Key)}>
                        <img src='https://cdn-icons-png.flaticon.com/128/1214/1214428.png'alt="Delete" />
                      </a>
                      <h4 class = "button-feed" onClick={() => ChangPageToTagPost(post.Tag)}>#{post.Tag}</h4>
                      <h2>{post.Text_Post}</h2>

                      <a onClick={() => handleLikeClick(post._id)} >
                        
                        {likedStatus[post._id] ?
                        <img style={{ width: '40px', height: '40px' }}
        
                        // unlike
                        src='https://cdn-icons-png.flaticon.com/128/739/739231.png'></img>
                        : 
                        // like
                        <img style={{ width: '40px', height: '40px' }}
                        src='https://cdn-icons-png.flaticon.com/128/126/126473.png'></img>}
                        
                        </a>
                        <a style={{ fontSize :'30px' }}>   {post.Like_Post}         </a>
                        <a className="comment-button" onClick={() => ChangePageToComment(post.Post_Key)}>
                        <img src="https://e7.pngegg.com/pngimages/459/323/png-clipart-smiley-happiness-line-comment-icon-face-smiley-thumbnail.png" alt="Comment" />
                        <a  style={{ fontSize :'30px' }}>       {post.Comment_Count}</a>
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
          
    
    return (
        <>
        <div>
            <Tag/>
            <TaskBar/>
            <a onClick={gotoinsertpost} class="float">
            <img style={{ width :'50px' }}
                src='https://cdn2.iconfinder.com/data/icons/squircle-ui/32/Edit-512.png'></img>
            </a>
           
            <div>{pnd}</div>
        </div>
        </>
    )
}
export default MyPost;