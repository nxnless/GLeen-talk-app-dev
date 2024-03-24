
import { Outlet, Link ,Routes , Route ,  BrowserRouter} from "react-router-dom";
import HomePage from './HomePage';
import Login from "./Login";
import Register from "./Register";
function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/login" element = {<Login/>}/>
        <Route path="/register" element= {<Register/>}/>
      </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
