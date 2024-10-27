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
        <Typography variant="h5" style={{ flexGrow: 1 }} padding={1} color={"white"}>+</Typography>
        <Button color="inherit" href="/">{' '}Home</Button>
        <Button color="inherit" href="/profile">{' '}Profile</Button>
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
        <Button variant = "contained" onClick = {""} color="success">Update Info</Button>
        <Button variant = "contained" onClick = {""} >Settings</Button>
        <Button variant = "contained" onClick = {""} color="warning">Favorites</Button>
        <Button variant = "contained" onClick = {""} color="error">Delete Account</Button>
      </Stack>
    </Stack>
  </Box>
  )
}
