// file นี้เอาไว้ test การ query แล้วมีการ sort ใหม่
// test query โดยมีการ filter ใช้ในหน้า my post หรือ หน้า on trend
import React, { useState ,useEffect} from 'react';
import axios from 'axios';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import Tag from './Component/Tag';
import TaskBar from './Component/TaskBar';
import './Component/Style.css'
const Latest = ()=>{
    const baseURL = "http://127.0.0.1:5000";
    const navigate = useNavigate();
    const [allPost,setAllpost ] = useState([]);
    const [User_ID,setUserID] = useState('');
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

    const ReportPost = async (p_key) =>{
        navigate("/postreport/"+p_key);;
    }

    useEffect(() => {
        getAllPost();
    }, []);

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
    console.log(User_ID);
    const ChangPageToTagPost= async(tag) =>{
        navigate("/getpostbytag/"+tag+"/"+token);;
    }

    const ChangePageToComment= async(post) =>{
        navigate("/comment/"+post+"/"+token);;
    }

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
              <a className="report-button">
                <img 
                src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAMAAACahl6sAAAAYFBMVEX///8jHyAmIiP8+/xMR0cyMDEyLi+fnZ6cmporKipta2tGQUT09PQxKy5JRkYsKSnW1ta9vL3c3NxPTE1MSEuwrq+XlZVDQEC2tLXS0dJnZWapp6gqJCfv7u4+ODllY2MTHEwoAAACG0lEQVR4nO3Z0VKjMBSA4SYUSIECrUrVXXff/y23Ti/UFnJOmjOjw/7fff6JGFIImw0AAAAAAAAAAAAAAAAAAAAAAAAAAAAAALjHGJq+8r7qmzB+Z+Nlem0H54f2dbqj0YXWfdKG7nsab9Ppc+OU2CjC3l2p6iJtCiaNabhu7ENC47i9Hv7u8ZgyB4vG2Oc1DjeX4WJ30M/BovG80BiUjSc/P945/6Sdg0Xj11JC2TgszuFcUF4Li8bzckLVOC78Py92qvVp0Rh/5zWK2Xv0w4NizzBpzN7nCY0QH+9cLU/CojFlNrqbvf9aJf4iWTTeootT0RAvpuJyWjTEf4jUaOVAL03CovFHbrSx8aM83jnhyc2i8aJpxDYuxaoQ14VFQ7Gy4o1GE2jik7Bo/M1tCJv3xTY+CYvGSS7EG5UmUMYnYdEQN1+pEXlE+uDjk7BoaBLRxmr+kNUsrdXc7KvZflfzg6h6vBDeaSwa2Y8oP+ahUXGTxBureYzvxM2zlF+sDBryi5XUqPMuhFkj91V3UzzGx6sODiwauYcPm+MuNn7QHQcZNMbo4tI01nJAt54j0/P1XFgZ2sNjq0buIfZ5jc/erQ9pnxUsGrNHlimNor75LSiTP9JYNEJ2o6u/7H99fc+nN4tG+PK00t7TGOtmW3pfbps6aUGYN0LT773f53xQBQAAAAAAAAAAAAAAAAAAAAAAAAAAAADgP/cPR8keyvgAsIwAAAAASUVORK5CYII='
                onClick={() => ReportPost(post.Post_Key)}
                alt="Report" />
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
        <TaskBar/>
        <Tag/>
        <a onClick={gotoinsertpost} class="float">
            <img style={{ width :'50px' }}
            src='https://cdn2.iconfinder.com/data/icons/squircle-ui/32/Edit-512.png'></img>
        </a>
        <div>
            <div>{pnd}</div>
        </div>
        </>
    )
}
export default Latest;