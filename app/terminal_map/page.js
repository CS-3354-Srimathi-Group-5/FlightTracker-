// AeroScope Home Page 
// Ashraful Islam

'use client'
import Image from "next/image";
import {Box, Stack, TextField, Button, Typography, Container, AppBar, Toolbar, Grid } from '@mui/material'
// import {useState, useRef, useEffect} from 'react'
// import styles from "./page.module.css";

export default function Home() 
{
  return (
  <Box 
    width="100vw" 
    height="100vh" 
    display="flex"
    flexDirection="column"
    justifyContent="center"
    alignItems="center">
    <Stack direction={'row'} display={'flex'}>
      <Image src="/AeroScopeLogo.png" alt="Description of Image" height={'75'} width={'75'} />
      <Typography variant={'h4'} color={'#339fff'} padding={2}>
        AeroScope
      </Typography>
    </Stack>
      
    <AppBar position="static" sx={{backgroundColor: "blue"}}>
      <Toolbar>
        {/* <Image src="/android-chrome-192x192.png" alt="Description of Image" height={'50'} width={'50'} /> */}
        <Button color="inherit" href="/">{' '}Back</Button>
        <Button color="inherit" href="">{' '}Map</Button>
        <Typography variant="h5" style={{ flexGrow: 1 }} padding={1} color={"white"}>T</Typography>
        <Button color="inherit" href="/">{' '}Home</Button>
        <Button color="inherit" href="/profile">{' '}Profile</Button>
        {/* <SignedOut> */}
          {/* <Button color="inherit" href="/login">{' '}Login</Button> */}
          {/* <Button color="inherit" href="/sign-up">{' '}Sign Up</Button> */}
        {/* </SignedOut> */}
        {/* <SignedIn> */}
          {/* <UserButton /> */}
        {/* </SignedIn> */}
      </Toolbar>
    </AppBar>

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
      alignItems={'center'}
      overflow="auto"
      maxHeight="100%">
        {
        //   <h1>terminal_map</h1>
           <Image src="/terminal_map.png" alt="Description of Image" height={'900'} width={'700'} />
        }
      </Stack>
    </Stack>
  </Box>
  );
}
