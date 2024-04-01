// file นี้เอาไว้ test การ query แล้วมีการ sort ใหม่
// test query โดยมีการ filter ใช้ในหน้า my post หรือ หน้า on trend
import React, { useState ,useEffect} from 'react';
import axios from 'axios';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import Tag from './Component/Tag';
import TaskBar from './Component/TaskBar';
import './Component/Comment.css'

const ReadComment = ()=>{
    const baseURL = "https://super-pancake-5p4jj6jvxrw3vgpv-5000.app.github.dev/";
    const TextComment = React.createRef();
    const navigate = useNavigate();
    const [Post,setPost ] = useState([]);
    const [User_ID,setUserID] = useState('');
    const [allComment,setAllComment] = useState('');
    const [inputValue, setInputValue] = useState('');



    const icon = [
        "",
        'https://i.pinimg.com/474x/f3/ec/fb/f3ecfb45cf3578f3e85db3f78b7a63fc.jpg',
        'https://i.pinimg.com/474x/61/ec/3f/61ec3f2e0837d05cbdedee6fe659735e.jpg',
        'https://i.pinimg.com/474x/7e/3e/75/7e3e75850855f7f8fc6859bb39e3919a.jpg',
        'https://i.pinimg.com/474x/db/d6/4f/dbd64f8b5f641068c191d01ad49d56c9.jpg',
        'https://i.pinimg.com/474x/25/62/57/2562574c6f8b3f24f127b71ab54e0fc0.jpg',
        'https://i.pinimg.com/474x/d1/91/fc/d191fc691d2a824422062b58e4b0056f.jpg',
        'https://i.pinimg.com/474x/36/27/a0/3627a0badea846944803300919e45776.jpg',
        'https://i.pinimg.com/474x/ea/19/e7/ea19e7658b5ffc6fa91e117db153dd16.jpg',
        'https://i.pinimg.com/474x/55/8d/21/558d21df2ebd3e60bba71734de39f5ca.jpg',
        'https://i.pinimg.com/474x/ea/19/e7/ea19e7658b5ffc6fa91e117db153dd16.jpg',
        'https://i.pinimg.com/474x/39/f3/96/39f39600861e07d5276d78f820870b03.jpg',
        'https://i.pinimg.com/474x/e5/1e/05/e51e0561de021a54456dfac665dd367d.jpg',
        'https://i.pinimg.com/474x/4c/15/b6/4c15b686884654b367ae3b4844aa1e11.jpg',
        'https://i.pinimg.com/474x/2f/78/02/2f7802a87f117569b73dad97f686d6ae.jpg',
        'https://i.pinimg.com/474x/0e/74/ea/0e74eadced51b6c5f44e3cd6b4cd367f.jpg',
        'https://i.pinimg.com/474x/76/67/5f/76675f673bc57aa7e608d74bb1a3fe0c.jpg',
        'https://i.pinimg.com/474x/72/ee/d0/72eed0635c2bec827ce193a5c81ad5ab.jpg',
        'https://i.pinimg.com/474x/3c/75/a1/3c75a141b222c02cffdb068f291fdb6b.jpg',
        'https://i.pinimg.com/474x/a9/12/92/a91292f249d6d842d15bb928179b4ce6.jpg',
        'https://i.pinimg.com/736x/76/09/8d/76098de804ddcf43f2a784aeadf60525.jpg'
    ]
        
    console.log(icon[0])
    //Normal Get 
    const para  = useParams();
    const token = para.token;
    const one_post = para.post_key;

    const getPost = async () => {
        try {
            const response = await axios.get(baseURL +'/api/GetOnePost/'+one_post);
            setPost(response.data);
            // console.log(response.data);
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };
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
    const ChangPageToTagPost= async(tag) =>{
        navigate("/getpostbytag/"+tag+"/"+token);
        window.location.reload(false);
        
    }
    const getComment = async () => {
        try {
            const response = await axios.get(baseURL + '/api/GetComment/'+one_post);
            setAllComment(response.data);
            // console.log(response.data);
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    useEffect(() => {
        fetchData();
        getPost();
        getComment();
    }, []); 
    
   

    // console.log(allComment);
    const sendComment = () =>{
        fetchData();
        if(User_ID){
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
            setInputValue('');
            // Focus the input field after clearing (optional)
            TextComment.current.focus();
            getComment();
            getComment();
            getComment();
            getComment();
            getPost();
            getPost();
            getPost();
            getPost();
        }else{
            navigate("/login");
        }
    }

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
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
                    getPost();
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
            getPost();
        }
        getPost();
        getPost();
        getPost();
    }

    function likeCommentApi(commentId, liked) {
        const data = {
            User_ID:User_ID,
            Post_Key:Post.Post_Key,
            Comment_Key:commentId
        }
        if (liked) {
            try {
                axios.post(baseURL + "/api/LikeComment", data)
                    .then(response => {
                        console.log(response.data);
                        getComment();
                    })
                    .catch(error => {
                        console.error('Error fetching data:', error);
                    });
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        } else {
            axios.delete(baseURL + "/api/DeleteCommentLike", { data })
            .then(response => {
                console.log(response.data);
                getComment();
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
        }
        getComment();
        getComment();
        getComment();
    }
    
    

    const [likedStatus, setLikedStatus] = useState({});
    const [likedComments, setLikedComments] = useState({});
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

    const handleLikeCommentClick = (commentId) => {
        fetchData();
        if(User_ID){
        const updatedLikedComments = { ...likedComments };
        updatedLikedComments[commentId] = !updatedLikedComments[commentId]; // Toggle liked status for this comment
        setLikedComments(updatedLikedComments); // Update liked status in state
        likeCommentApi(commentId, updatedLikedComments[commentId]); // Call API function
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
 // Access the first (and only) element in the array
 const pnd = (
    <div className="box">
      <div className="container">
        <div id="post-list" style={{ marginTop: '100px' }}>
            <div className="post" key={Post._id}>
              <a className="report-button" href="report.html">
                <img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAMAAACahl6sAAAAYFBMVEX///8jHyAmIiP8+/xMR0cyMDEyLi+fnZ6cmporKipta2tGQUT09PQxKy5JRkYsKSnW1ta9vL3c3NxPTE1MSEuwrq+XlZVDQEC2tLXS0dJnZWapp6gqJCfv7u4+ODllY2MTHEwoAAACG0lEQVR4nO3Z0VKjMBSA4SYUSIECrUrVXXff/y23Ti/UFnJOmjOjw/7fff6JGFIImw0AAAAAAAAAAAAAAAAAAAAAAAAAAAAAALjHGJq+8r7qmzB+Z+Nlem0H54f2dbqj0YXWfdKG7nsab9Ppc+OU2CjC3l2p6iJtCiaNabhu7ENC47i9Hv7u8ZgyB4vG2Oc1DjeX4WJ30M/BovG80BiUjSc/P945/6Sdg0Xj11JC2TgszuFcUF4Li8bzckLVOC78Py92qvVp0Rh/5zWK2Xv0w4NizzBpzN7nCY0QH+9cLU/CojFlNrqbvf9aJf4iWTTeootT0RAvpuJyWjTEf4jUaOVAL03CovFHbrSx8aM83jnhyc2i8aJpxDYuxaoQ14VFQ7Gy4o1GE2jik7Bo/M1tCJv3xTY+CYvGSS7EG5UmUMYnYdEQN1+pEXlE+uDjk7BoaBLRxmr+kNUsrdXc7KvZflfzg6h6vBDeaSwa2Y8oP+ahUXGTxBureYzvxM2zlF+sDBryi5XUqPMuhFkj91V3UzzGx6sODiwauYcPm+MuNn7QHQcZNMbo4tI01nJAt54j0/P1XFgZ2sNjq0buIfZ5jc/erQ9pnxUsGrNHlimNor75LSiTP9JYNEJ2o6u/7H99fc+nN4tG+PK00t7TGOtmW3pfbps6aUGYN0LT773f53xQBQAAAAAAAAAAAAAAAAAAAAAAAAAAAADgP/cPR8keyvgAsIwAAAAASUVORK5CYII='alt="Report" />
              </a>
              <h4 class = "button-feed" onClick={() => ChangPageToTagPost(Post.Tag)}>#{Post.Tag}</h4>
              <h2>{Post.Text_Post}</h2>
              <a onClick={() => handleLikeClick(Post._id)} >
                
                {likedStatus[Post._id] ?
                <img style={{ width: '40px', height: '40px' }}

                // unlike
                src='https://cdn-icons-png.flaticon.com/128/739/739231.png'></img>
                : 
                // like
                <img style={{ width: '40px', height: '40px' }}
                src='https://cdn-icons-png.flaticon.com/128/126/126473.png'></img>}
                
                </a>
                <a style={{ fontSize :'30px' }}>   {Post.Like_Post}         </a>
                <a className="comment-button" >
                <img src="https://e7.pngegg.com/pngimages/459/323/png-clipart-smiley-happiness-line-comment-icon-face-smiley-thumbnail.png" alt="Comment" />
                <a  style={{ fontSize :'30px' }}>       {Post.Comment_Count}</a>
              </a>
            </div>
        </div>
      </div>
    </div>
  );
    

    let commentInThisPost;
    if (Array.isArray(allComment)) {
        commentInThisPost = allComment.map(p => (
            <div key={p._id}  class="container-comment">
                <img src={icon[p.Icon_id]} style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
                <p style={{fontSize:'25px'}} >{p.Text_Comment}</p>
                <a onClick={() => handleLikeCommentClick(p.Comment_Key)} >
                {likedComments[p.Comment_Key] ?
                    <img style={{ width: '40px', height: '40px' }}    
                    // unlike
                    src='https://cdn-icons-png.flaticon.com/128/739/739231.png'></img>
                    : 
                    // like
                    <img style={{ width: '40px', height: '40px' }}
                    src='https://cdn-icons-png.flaticon.com/128/126/126473.png'></img>}
                    <a style={{ fontSize :'30px' }}>   {p.Like_Comment}         </a>
                </a>
            </div>
        ))
    }

    return (
        <>  
        <TaskBar/>
        <Tag/>
        <div>{pnd}</div>
            <h3>
                COMMENT
            </h3>
        
            <div>
                {commentInThisPost}
            </div>

            <div class="float-form">
            <div class="container-form">
         
                <textarea 
                    style={{marginTop:"-50px", marginLeft:"-40px" , width: '770px'}} 
                    class="input-form" rows="3" ref = {TextComment} 
                    onChange={handleInputChange} 
                    value={inputValue} 
                    placeholder="Typing..."
                
                />
            <a style={{ marginLeft:"-240px" }} onClick={sendComment.bind()} >
                <img style={{ marginLeft:"140px", marginTop:"-39px", width: '70px', height: '65px', backgroundColor:'white'}} src="https://cdn-icons-png.flaticon.com/128/9333/9333991.png" alt="editpostimg"/>
            </a>
            </div>
            </div>
            
        </>
    );
    
}
export default ReadComment;