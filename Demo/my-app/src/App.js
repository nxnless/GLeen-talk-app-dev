
import { Outlet, Link ,Routes , Route ,  BrowserRouter} from "react-router-dom";
import HomePage from './HomePage';
import Login from "./Login";
import Register from "./Register";
import MyPost from "./MyPost";
import Latest from "./Latest";
import Postbytag from "./PostByTag";
function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/login" element = {<Login/>}/>
        <Route path="/register" element= {<Register/>}/>
        <Route path="/mypost/:token" element={<MyPost/>}/>
        <Route path="/latest" element={<Latest/>}/>
        <Route path="/latest/:token" element={<Latest/>}/>
        <Route path="/getpostbytag/:tag_id" element={< Postbytag />}/>
        <Route path="/getpostbytag/:tag_id/:token" element={<Postbytag/>}/>
      </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
