import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Getfilter from './Getfilter';
import GetSort from './GetSort';
import Register from './Register';
import Login from './Login';
import InsertPost from './InsertPost';
import InsertTest from './InsertTest';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <Getfilter/> */}
    {/* <GetSort/> */}
    {/* <App /> */}
    <Register></Register>
    {/* <Login/> */}
    {/* <InsertPost/> */}
    {/* <InsertTest/> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
