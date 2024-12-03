// AeroScope user profile Page 
// Ashraful Islam
// external login comming soon for live users

'use client'
// import Router from 'next/router';
// import Link from 'next/link';
// import { useRouter } from 'next/router';
// import {useState, useRef, useEffect} from 'react'
// import styles from "./page.module.css";
import {Box, Stack, TextField, Button, Typography, Container, AppBar, Toolbar, Grid } from '@mui/material'
import backgroundGif from '../assets/plane.gif';


export default function Home() 
{
  // const router = useRouter();

  return (
  <Box 
    width="100%" 
    height="100vh" 
    display="flex"
    flexDirection="column"
    justifyContent="center"
    alignItems="center"
    sx={{
      backgroundImage: `url(${backgroundGif})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
    }}
    >

    {/* profile items comming soon */}  
    <Stack
    direct="column"
    width="85%"
    height="75%"
    border="2px solid black"
    borderRadius={5}
    p={2}
    spacing={3}
    sx={{
      background: 'linear-gradient(to bottom, rgba(245, 245, 245, 0.9), rgba(0, 44, 74, 0.9))',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      alignItems: 'center',
    }}
    >
      <Stack
      direction="column"
      spacing={2}
      flexGrow={1}
      overflow="auto"
      maxHeight="10%">
        {
          <h1>My Profile</h1>
        }
      </Stack>
      <Stack direction="column" spacing={2} height="70%">
          <h3>Name: Ashraful Islam</h3>
          <h3>AeroID: AI01010</h3>
          <h3>Status: ACTIVE</h3>
      </Stack>
      <Stack direction="row" spacing={2}>
        <Button variant = "contained" href="/profile" color="success">Update Info</Button>
        <Button variant = "contained" href="/profile" >Settings</Button>
        <Button variant = "contained" href="/profile/favorites" color="warning">Favorites</Button>
        <Button variant = "contained" href="/profile" color="error">Delete Account</Button>
      </Stack>
    </Stack>
  </Box>
  )
}