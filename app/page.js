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
        <Button color="inherit" href="/">{' '}Back</Button>
        <Button color="inherit" href="/terminal_map">{' '}Map</Button>
        <Typography variant="h5" style={{ flexGrow: 1 }} padding={1} color={"white"}>*</Typography>
        <Button color="inherit" href="/">{' '}Home
          {/* <Image src="/AeroScopeLogo.png" alt="Description of Image" height={'50'} width={'50'} /> */}
        </Button>
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
      overflow="auto"
      maxHeight="15%">
        {
          <h1>Welcome to AeroScope website!</h1>
        }
      </Stack>
      <Stack direction="row" alignItems={'center'} spacing={5}>
        <Stack direction="column" spacing={5} alignItems={'center'} width="50%">
            <h3>Flight Info</h3>
            <Button variant = "contained" onClick = {""}>Current Flights</Button>
            <Button variant = "contained" onClick = {""}>Globe View</Button>
            <Button variant = "contained" onClick = {""}>Customs Info</Button>
        </Stack>
        <Stack direction="column" spacing={5} alignItems={'center'} width="50%">
            <h3>Transporation</h3>
            <Button variant = "contained" onClick = {""}>Parking Lots</Button>
            <Button variant = "contained" onClick = {""}>Car Rental</Button>
            <Button variant = "contained" onClick = {""}>Shuttle Service</Button>
        </Stack>
        <Stack direction="column" spacing={5} alignItems={'center'} width="50%">
            <h3>Shop DFW Airport</h3>
            <Button variant = "contained" onClick = {""}>Resturants</Button>
            <Button variant = "contained" onClick = {""}>Air Hotel</Button>
            <Button variant = "contained" onClick = {""}>Souvieners</Button>
        </Stack>
      </Stack>
    </Stack>
  </Box>
          // <img src="android-chrome-192x192.png" alt="Description of Image" height={'75'} width={'75'}/>
    // <div>
    //   <h1 className={styles.title}>Welcome to AeroScope</h1>
    //   <p className={styles.description}>
    //   </p>
    // </div>
  );
}
