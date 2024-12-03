// AeroScope user favorites Page 
// Ashraful Islam
// external databse storage comming soon

'use client'
// import Router from 'next/router';
// import Link from 'next/link';
// import { useRouter } from 'next/router';
import {Box, Stack, TextField, Button, Typography, Container, AppBar, Toolbar, Grid } from '@mui/material'
import backgroundGif from '../assets/plane.gif';
// import {useState, useRef, useEffect} from 'react'
// import styles from "./page.module.css";

export default function Home() 
{
  // const router = useRouter();

  return (
  <Box 
    width="100%" 
    height="100%" 
    display="flex"
    flexDirection="column"
    justifyContent="center"
    alignItems="center"
    sx={{
      position: 'relative',
      backgroundImage: `url(${backgroundGif})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.8)', // 80% opaque white overlay
        zIndex: 1,
      },
      '& > *': {
        position: 'relative',
        zIndex: 2, // Ensure content is above the overlay
      },
  }}
  >


    {/* favorties saved list */}  
    <Stack
      direct="column"
      width="70%"
      border="2px solid black"
      borderRadius={5}
      p={3}
      spacing={3}
      sx={{
        mt: 5,
        // background: 'linear-gradient(to bottom, #f5f5f5, #002c4a)',
        background: 'linear-gradient(to bottom, rgba(245, 245, 245, 0.9), rgba(0, 44, 74, 0.9))',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        alignItems: 'center',
      }}
    >
      <Stack
      direction="column"
      spacing={5}
      flexGrow={1}
      overflow="auto"
      maxHeight="10%">
        {
          <h1>My Favorites</h1>
        }
      </Stack>
      {/* plane #1 */}
      <Stack direction="column" spacing={2} height="70%" border="1px solid blue" borderRadius={5} padding={4}>
          <h3>Aircraft Name: AirBus A380</h3>
          <h3>Flight Number: 0123456789</h3>
          <h3>Flight Status: IN TRANSIT</h3>
          <h3>Flight Duration: 10:05 HRS</h3>
          <h3>Start Location: Dallas Fort Worth (DFW) International Airport, 2400 Aviation Dr, Dallas, TX 75261</h3>
          <h3>Start Time: 7:13 PM - Sunday, October 27, 2024 (CDT)</h3>
          <h3>Destination Location: Dubai International Airport, Dubai - United Arab Emirates</h3>
          <h3>Destination Time: 4:12 AM - Monday, October 28, 2024 (GMT+4)</h3>
          <Stack direction="row" spacing={2} height="70%" padding={1}> <Button variant = "contained" href="/profile/favorites" color="error">Delete</Button> </Stack>
      </Stack>
        {/* plane #2 */}
      <Stack direction="column" spacing={2} height="70%" border="1px solid blue" borderRadius={5} padding={4}>
          <h3>Aircraft Name: Boeing B37</h3>
          <h3>Flight Number: 9876543210</h3>
          <h3>Flight Status: FATAL ERROR!</h3>
          <h3>Flight Duration: 14:50 HRS</h3>
          <h3>Start Location: Dallas Fort Worth (DFW) International Airport, 2400 Aviation Dr, Dallas, TX 75261</h3>
          <h3>Start Time: 7:13 PM - Sunday, October 27, 2024 (CDT)</h3>
          <h3>Destination Location: John F. Kennedy International Airport, Queens, NY</h3>
          <h3>Destination Time: 8:16 PM - Sunday, October 27, 2024 (EDT)</h3>
          <Stack direction="row" spacing={2} height="70%" padding={1}> <Button variant = "contained" href="/profile/favorites" color="error">Delete</Button> </Stack>
      </Stack>
      <Stack direction="row" spacing={2} height="70%" padding={1}> <Button variant = "contained" href="/profile/favorites" color="success">Save</Button> </Stack>
    </Stack>
  </Box>
  )
}