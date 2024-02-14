import React, { useState } from "react";
import {
  Link,
  useMatch,
  useResolvedPath,
  useLocation,
  useNavigate,
} from "react-router-dom";
// import store from "../store";
import { easeInOut, motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../store/UserSlice.jsx";

function getUser() {
  let user = localStorage.getItem("user");
  if (user) {
    user = JSON.parse(user);
  } else {
    user = null;
  }
  return user;
}

export default function Login() {
  const location = useLocation();
  const Path = location.state;
  const GetPath = location.state;
  // const GetPath = Path.Path;
  const [UserID, setUserID] = useState("");
  const [Password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.user);

  // console.log('location');
  // console.log(Path);
  // console.log(GetPath);

  const handleLoginEvent = (e) => {
    e.preventDefault();

    let userCredentials = {
      UserID,
      Password,
    };
    dispatch(loginUser(userCredentials)).then((result) => {
      if (result.payload) {
        setUserID("");
        setPassword("");
        // const statedata = store.getState();
        // console.log(statedata);
        // console.log(GetPath);
        navigate("/" + GetPath);
      }
    });
  };

  const [user, setUser] = useState(getUser());

  return (
    <motion.div
      initial={{ opacity: 0.5 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.75, ease: "easeOut" }}
      className="BG_Login_Main"
    >
      <div className="relative flex flex-col justify-center min-h-screen overflow-hidden bg-Product">
        <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl shadow-rose-600/40 ring ring-2 ring-purple-600 sm:max-w-md md:max-w-md lg:max-w-xl">
          <h1 className="text-3xl font-semibold text-center text-purple-700 underline uppercase decoration-wavy">
            Sign in
          </h1>
          <form className="mt-6" onSubmit={handleLoginEvent}>
            <div className="mb-2">
              <label
                for="email"
                className="block text-sm font-semibold text-gray-800"
              >
                User ID
              </label>
              <input
                type="text"
                className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                // label='User ID '
                placeholder="222xxxx"
                value={UserID}
                onChange={(e) => setUserID(e.target.value)}
              />
            </div>
            <div className="mb-2">
              <label
                for="password"
                className="block text-sm font-semibold text-gray-800"
              >
                Password
              </label>
              <input
                type="password"
                className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                placeholder="password"
                value={Password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <a  className="text-xs text-purple-600 hover:underline">
              Forget Password?
            </a>
            <div className="mt-6">
              <button
                className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
                type="submit"
              >
                {loading ? "Loading..." : "Sign Up"}
              </button>
              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}
            </div>
          </form>
          <div className="mt-6">
            <Link to="/">
              <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600">
                Back
              </button>
            </Link>
          </div>

          {/* <p className="mt-8 text-xs font-light text-center text-gray-700">
                    {" "}
                    Don't have an account?{" "}
                    <a
                        href="#"
                        className="font-medium text-purple-600 hover:underline"
                    >
                        Sign up
                    </a>
                </p> */}
        </div>
      </div>
    </motion.div>
  );
}
