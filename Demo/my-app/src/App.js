
import { Outlet, Link ,Routes , Route ,  BrowserRouter} from "react-router-dom";
import { useNavigate , useHistory} from 'react-router-dom';
import HomePage from './HomePage';
import Login from "./Login";
import Register from "./Register";
import MyPost from "./MyPost";
import Latest from "./Latest";
import Postbytag from "./PostByTag";
import InsertPost from "./insertPost";
import ReadComment from "./readcomment";
function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/homepage/:token" element={<HomePage/>}/>
        <Route path="/" element = {<Login/>}/>
        <Route path="/register" element= {<Register/>}/>
        <Route path="/mypost/:token" element={<MyPost/>}/>
        <Route path="/latest" element={<Latest/>}/>
        <Route path="/latest/:token" element={<Latest/>}/>
        <Route path="/getpostbytag/:tag_name" element={< Postbytag />}/>
        <Route path="/getpostbytag/:tag_name/:token" element={<Postbytag/>}/>
        <Route path="/insertpost/:token" element={< InsertPost />}/>
        <Route path="/comment/:post_key/:token" element={< ReadComment />}/>
      </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
