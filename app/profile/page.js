// AeroScope user profile Page 
// Ashraful Islam
// external login comming soon for live users

'use client'
import Image from "next/image";
// import Router from 'next/router';
// import Link from 'next/link';
// import { useRouter } from 'next/router';
import {Box, Stack, TextField, Button, Typography, Container, AppBar, Toolbar, Grid } from '@mui/material'
import { UserButton, SignedIn, SignedOut } from '@clerk/nextjs'
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
    
    {/* app tool bar on top of the website for navigation */}    
    <AppBar position="static" sx={{backgroundColor: "#59788e"}}>
      <Toolbar>
        <Button color="inherit" href="/"> <Image src="/back.png" alt="Description of Image" height={'50'} width={'50'} />  </Button>
        <Button color="inherit" href="/terminal_map"> <Image src="/map.png" alt="Description of Image" height={'40'} width={'40'} />  </Button>
        <Typography variant="h4" style={{ flexGrow: 1 }} textAlign={'center'} padding={0} color={"white"}> </Typography>
        <Image src="/AeroScopeLogoV2.png" alt="Description of Image" height={'150'} width={'150'} />
        <Typography variant="h4" style={{ flexGrow: 1 }} textAlign={'center'} padding={0} color={"white"}> </Typography>
        <Button color="inherit" href="/"> <Image src="/home.png" alt="Description of Image" height={'40'} width={'40'} />  </Button>
          <SignedOut>
            <Stack flexDirection={"column"}>
              <Button sx={{color: "#000"}} href="/login">{' '}Login</Button>
              <Button sx={{color: "#000"}} href="/sign-up">{' '}Sign Up</Button>
            </Stack>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
      </Toolbar>
    </AppBar>


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
        <Typography variant="h4" style={{ flexGrow: 1 }} textAlign={'left'} padding={0} color={"black"}> My Profile</Typography>
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
