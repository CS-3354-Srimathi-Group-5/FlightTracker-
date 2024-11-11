// AeroScope user profile Page 
// Ashraful Islam
// external login comming soon for live users

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
    height="100vh" 
    display="flex"
    flexDirection="column"
    justifyContent="center"
    alignItems="center">

    {/* profile items comming soon */}  
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