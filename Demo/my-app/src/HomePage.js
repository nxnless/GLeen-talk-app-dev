// file นี้เอาไว้ test การ query แล้วมีการ sort ใหม่
// test query โดยมีการ filter ใช้ในหน้า my post หรือ หน้า on trend
import React, { useState } from 'react';
import axios from 'axios';
import Login from './Login';
import { useNavigate} from 'react-router-dom';
import { useParams } from 'react-router-dom';
const HomePage = ()=>{
    const navigate = useNavigate();
    const para = useParams();
    const token = para.token;
    const gotolatestpolst = ()=>{
        navigate("/latest/"+token)
    }

    const gotoinsertpost = ()=>{
        navigate("/insertpost/"+token)
    }

    const gotomypost = ()=>{
        navigate("/mypost/"+token)
    }
    return (
        <>
            <h1 onClick={gotolatestpolst}>Latest</h1>
            <h1 onClick={gotoinsertpost}>insertPost</h1>
            <h1 onClick={gotomypost}>mypost</h1>
        </>
    )
}
export default HomePage;