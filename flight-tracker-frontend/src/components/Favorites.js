// AeroScope user favorites Page 
// Ashraful Islam
// external databse storage comming soon

'use client'
// import Router from 'next/router';
// import Link from 'next/link';
// import { useRouter } from 'next/router';
import {Box, Stack, TextField, Button, Typography, Container, AppBar, Toolbar, Grid } from '@mui/material'
// import {useState, useRef, useEffect} from 'react'
// import styles from "./page.module.css";

export default function Home() 
{
  // const router = useRouter();

  return (
  <Box 
    width="100vw" 
    height="100%" 
    display="flex"
    flexDirection="column"
    justifyContent="center"
    alignItems="center">


    {/* favorties saved list */}  
    <Stack
    direct="column"
    width="85%"
    height="75%"
    border="2px solid black"
    borderRadius={5}
    p={2}
    spacing={3}>
      <Stack
      direction="column"
      spacing={2}
      flexGrow={1}
      overflow="auto"
      maxHeight="10%">
        {
          <h1>My Favorites</h1>
        }
      </Stack>
      {/* plane #1 */}
      <Stack direction="column" spacing={2} height="70%" border="1px solid blue" borderRadius={5} padding={1}>
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
      <Stack direction="column" spacing={2} height="70%" border="1px solid blue" borderRadius={5} padding={1}>
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