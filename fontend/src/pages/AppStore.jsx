import React from "react";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar.jsx";
import Sidebar from "../components/Sidebar.jsx";
import Topbar from "../components/Topbar.jsx";
import Carousel from "../components/Carousel.jsx";
import { Box, IconButton, Typography, useTheme, Divider } from "@mui/material";
import { tokens } from "../theme";
import axios from "axios";

const AppStore = () => {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isSidebar, setIsSidebar] = useState(true);

  useEffect(() => {
    const URL = "http://192.168.1.108:5000/api/api_get_Post";
    // const jsonData = {
    //   StartDate: startDate,
    //   EndDate: endDate,
    // };
    // console.log(jsonData)
    axios
      .get(URL)
      // .post(SmldURL, {
      //   StartDate: startDate,
      //   EndDate: endDate,
      // })
      .then((res) => {
        console.log(res);
        console.log(res.data[0]);
      });
  }, []);

  return (
    <div className="app">
      <Sidebar isSidebar={isSidebar} />
      <main className="content">
        <Topbar setIsSidebar={setIsSidebar} />
        <Carousel />
      </main>
    </div>
  );
};

export default AppStore;
