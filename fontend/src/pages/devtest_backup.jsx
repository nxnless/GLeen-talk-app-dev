import React from 'react';
import {useState, useEffect} from 'react';
// import Navbar2 from "../components/Navbar/Navbar.jsx";
import {tokens} from '../theme';
import {
  Box,
  Button,
  IconButton,
  Typography,
  useTheme,
  Divider,
} from '@mui/material';

import Navbar from '../components/Navbar.jsx';
import Sidebar from '../components/SideBar.jsx';
import Topbar from '../components/Topbar.jsx';
import Carousel from '../components/Carousel.jsx';
import StatBox from '../components/StatBox';
import Header from '../components/Header';
import LineChart from '../components/LineChart';
import BarChart from '../components/BarChart';
import {mockTransactions} from '../data/MockData';

import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';
import EmailIcon from '@mui/icons-material/Email';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import TrafficIcon from '@mui/icons-material/Traffic';

const DevTest = () => {
  const theme = useTheme ();
  const colors = tokens (theme.palette.mode);
  const [isSidebar, setIsSidebar] = useState (true);
  return (
    <div className="app">
      <Sidebar isSidebar={isSidebar} />
      <main className="content">
        <Topbar setIsSidebar={setIsSidebar} />
        <div className="m-3">
          <div class="flex justify-between items-center">
            <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
            <Box>
              <Button
                sx={{
                  backgroundColor: colors.blueAccent[700],
                  color: colors.grey[100],
                  fontSize: '14px',
                  fontWeight: 'bold',
                  padding: '10px 20px',
                }}
              >
                <DownloadOutlinedIcon sx={{mr: '10px'}} />
                Download Reports
              </Button>
            </Box>
          </div>
          <div class="grid grid-cols-12 grid-rows-auto gap-3 h-32">
            <Box
              gridColumn="span 3"
              backgroundColor={colors.primary[400]}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <StatBox
                title="12,361"
                subtitle="Emails Sent"
                progress="0.75"
                increase="+14%"
                icon={
                  <EmailIcon
                    sx={{color: colors.greenAccent[600], fontSize: '26px'}}
                  />
                }
              />
            </Box>
            <Box
              gridColumn="span 3"
              backgroundColor={colors.primary[400]}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <StatBox
                title="431,225"
                subtitle="Sales Obtained"
                progress="0.50"
                increase="+21%"
                icon={
                  <PointOfSaleIcon
                    sx={{color: colors.greenAccent[600], fontSize: '26px'}}
                  />
                }
              />
            </Box>
            <Box
              gridColumn="span 3"
              backgroundColor={colors.primary[400]}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <StatBox
                title="32,441"
                subtitle="New Clients"
                progress="0.30"
                increase="+5%"
                icon={
                  <PersonAddIcon
                    sx={{color: colors.greenAccent[600], fontSize: '26px'}}
                  />
                }
              />
            </Box>
            <Box
              gridColumn="span 3"
              backgroundColor={colors.primary[400]}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <StatBox
                title="1,325,134"
                subtitle="Traffic Received"
                progress="0.80"
                increase="+43%"
                icon={
                  <TrafficIcon
                    sx={{color: colors.greenAccent[600], fontSize: '26px'}}
                  />
                }
              />
            </Box>
          </div>
          <div class="grid grid-cols-12 grid-rows-auto gap-3 h-8" />
          <div class="grid grid-cols-12 grid-rows-auto gap-3 h-32">
            <Box
              gridColumn="span 6"
              gridRow="span 2"
              backgroundColor={colors.primary[400]}
            >
              <Box
                mt="25px"
                p="0 30px"
                display="flex "
                justifyContent="space-between"
                alignItems="center"
              >
                <Box>
                  <Typography
                    variant="h5"
                    fontWeight="600"
                    color={colors.grey[100]}
                  >
                    Revenue Generated
                  </Typography>
                  <Typography
                    variant="h3"
                    fontWeight="bold"
                    color={colors.greenAccent[500]}
                  >
                    $59,342.32
                  </Typography>
                </Box>
                <Box>
                  <IconButton>
                    <DownloadOutlinedIcon
                      sx={{fontSize: '26px', color: colors.greenAccent[500]}}
                    />
                  </IconButton>
                </Box>
              </Box>
              <Box height="250px" m="-20px 0 0 0">
                <LineChart isDashboard={true} />
              </Box>
            </Box>
            <Box
              gridColumn="span 4"
              gridRow="span 2"
              backgroundColor={colors.primary[400]}
            >
              <Typography
                variant="h5"
                fontWeight="600"
                sx={{padding: '30px 30px 0 30px'}}
              >
                Sales Quantity
              </Typography>
              <Box height="250px" mt="-20px">
                <BarChart isDashboard={true} />
              </Box>
            </Box>
          </div>
        </div>

        <Box m="20px">
          {/* GRID & CHARTS */}
          <Box
            display="grid"
            gridTemplateColumns="repeat(12, 1fr)"
            gridAutoRows="140px"
            gap="20px"
          >
            {/* ROW 1 */}
            {/* <Box
              gridColumn="span 3"
              backgroundColor={colors.primary[400]}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <StatBox
                title="12,361"
                subtitle="Emails Sent"
                progress="0.75"
                increase="+14%"
                icon={
                  <EmailIcon
                    sx={{color: colors.greenAccent[600], fontSize: '26px'}}
                  />
                }
              />
            </Box> */}
            {/* <Box
              gridColumn="span 3"
              backgroundColor={colors.primary[400]}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <StatBox
                title="431,225"
                subtitle="Sales Obtained"
                progress="0.50"
                increase="+21%"
                icon={
                  <PointOfSaleIcon
                    sx={{color: colors.greenAccent[600], fontSize: '26px'}}
                  />
                }
              />
            </Box>
            <Box
              gridColumn="span 3"
              backgroundColor={colors.primary[400]}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <StatBox
                title="32,441"
                subtitle="New Clients"
                progress="0.30"
                increase="+5%"
                icon={
                  <PersonAddIcon
                    sx={{color: colors.greenAccent[600], fontSize: '26px'}}
                  />
                }
              />
            </Box>
            <Box
              gridColumn="span 3"
              backgroundColor={colors.primary[400]}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <StatBox
                title="1,325,134"
                subtitle="Traffic Received"
                progress="0.80"
                increase="+43%"
                icon={
                  <TrafficIcon
                    sx={{color: colors.greenAccent[600], fontSize: '26px'}}
                  />
                }
              />
            </Box> */}
          </Box>
          {/* Row2 */}
          {/* <Box
            gridColumn="span 6"
            gridRow="span 2"
            backgroundColor={colors.primary[400]}
          >
            <Box
              mt="25px"
              p="0 30px"
              display="flex "
              justifyContent="space-between"
              alignItems="center"
            >
              <Box>
                <Typography
                  variant="h5"
                  fontWeight="600"
                  color={colors.grey[100]}
                >
                  Revenue Generated
                </Typography>
                <Typography
                  variant="h3"
                  fontWeight="bold"
                  color={colors.greenAccent[500]}
                >
                  $59,342.32
                </Typography>
              </Box>
              <Box>
                <IconButton>
                  <DownloadOutlinedIcon
                    sx={{fontSize: '26px', color: colors.greenAccent[500]}}
                  />
                </IconButton>
              </Box>
            </Box>
            <Box height="250px" m="-20px 0 0 0">
              <LineChart isDashboard={true} />
            </Box>
          </Box>
          <Box
            gridColumn="span 4"
            gridRow="span 2"
            backgroundColor={colors.primary[400]}
          >
            <Typography
              variant="h5"
              fontWeight="600"
              sx={{padding: '30px 30px 0 30px'}}
            >
              Sales Quantity
            </Typography>
            <Box height="250px" mt="-20px">
              <BarChart isDashboard={true} />
            </Box>
          </Box> */}
          {/* End Row2 */}
        </Box>

      </main>
    </div>
  );
};

export default DevTest;
//   return (
//     <div className="app">
//       <Sidebar isSidebar={isSidebar} />
//       <main className="content">
//         <Topbar setIsSidebar={setIsSidebar} />
//         <Box m="20px">
//           {/* HEADER */}
//           <Box
//             display="flex"
//             justifyContent="space-between"
//             alignItems="center"
//           >
//             <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
//             <Box>
//               <Button
//                 sx={{
//                   backgroundColor: colors.blueAccent[700],
//                   color: colors.grey[100],
//                   fontSize: '14px',
//                   fontWeight: 'bold',
//                   padding: '10px 20px',
//                 }}
//               >
//                 <DownloadOutlinedIcon sx={{mr: '10px'}} />
//                 Download Reports
//               </Button>
//             </Box>
//           </Box>

//           {/* GRID & CHARTS */}
//           <Box
//             display="grid"
//             gridTemplateColumns="repeat(12, 1fr)"
//             gridAutoRows="140px"
//             gap="20px"
//           >
//             {/* ROW 1 */}
//             <Box
//               gridColumn="span 3"
//               backgroundColor={colors.primary[400]}
//               display="flex"
//               alignItems="center"
//               justifyContent="center"
//             >
//               <StatBox
//                 title="12,361"
//                 subtitle="Emails Sent"
//                 progress="0.75"
//                 increase="+14%"
//                 icon={
//                   <EmailIcon
//                     sx={{color: colors.greenAccent[600], fontSize: '26px'}}
//                   />
//                 }
//               />
//             </Box>
//             <Box
//               gridColumn="span 3"
//               backgroundColor={colors.primary[400]}
//               display="flex"
//               alignItems="center"
//               justifyContent="center"
//             >
//               <StatBox
//                 title="431,225"
//                 subtitle="Sales Obtained"
//                 progress="0.50"
//                 increase="+21%"
//                 icon={
//                   <PointOfSaleIcon
//                     sx={{color: colors.greenAccent[600], fontSize: '26px'}}
//                   />
//                 }
//               />
//             </Box>
//             <Box
//               gridColumn="span 3"
//               backgroundColor={colors.primary[400]}
//               display="flex"
//               alignItems="center"
//               justifyContent="center"
//             >
//               <StatBox
//                 title="32,441"
//                 subtitle="New Clients"
//                 progress="0.30"
//                 increase="+5%"
//                 icon={
//                   <PersonAddIcon
//                     sx={{color: colors.greenAccent[600], fontSize: '26px'}}
//                   />
//                 }
//               />
//             </Box>
//             <Box
//               gridColumn="span 3"
//               backgroundColor={colors.primary[400]}
//               display="flex"
//               alignItems="center"
//               justifyContent="center"
//             >
//               <StatBox
//                 title="1,325,134"
//                 subtitle="Traffic Received"
//                 progress="0.80"
//                 increase="+43%"
//                 icon={
//                   <TrafficIcon
//                     sx={{color: colors.greenAccent[600], fontSize: '26px'}}
//                   />
//                 }
//               />
//             </Box>
//           </Box>
//           <Box
//             gridColumn="span 8"
//             gridRow="span 2"
//             backgroundColor={colors.primary[400]}
//           >
//             <Box
//               mt="25px"
//               p="0 30px"
//               display="flex "
//               justifyContent="space-between"
//               alignItems="center"
//             >
//               <Box>
//                 <Typography
//                   variant="h5"
//                   fontWeight="600"
//                   color={colors.grey[100]}
//                 >
//                   Revenue Generated
//                 </Typography>
//                 <Typography
//                   variant="h3"
//                   fontWeight="bold"
//                   color={colors.greenAccent[500]}
//                 >
//                   $59,342.32
//                 </Typography>
//               </Box>
//               <Box>
//                 <IconButton>
//                   <DownloadOutlinedIcon
//                     sx={{fontSize: '26px', color: colors.greenAccent[500]}}
//                   />
//                 </IconButton>
//               </Box>
//             </Box>
//             <Box height="250px" m="-20px 0 0 0">
//               <LineChart isDashboard={true} />
//             </Box>
//           </Box>
//           <Box
//             gridColumn="span 4"
//             gridRow="span 2"
//             backgroundColor={colors.primary[400]}
//             overflow="auto"
//           />
//         </Box>
//         <Box
//           gridColumn="span 4"
//           gridRow="span 2"
//           backgroundColor={colors.primary[400]}
//         >
//           <Typography
//             variant="h5"
//             fontWeight="600"
//             sx={{padding: '30px 30px 0 30px'}}
//           >
//             Sales Quantity
//           </Typography>
//           <Box height="250px" mt="-20px">
//             <BarChart isDashboard={true} />
//           </Box>
//         </Box>
//       </main>
//     </div>
//   );
// };

// export default DevTest;
