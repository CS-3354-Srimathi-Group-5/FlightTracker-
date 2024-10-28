// AeroScope airport terminal map Page 
// Ashraful Islam

'use client'
import Image from "next/image";
// import Router from 'next/router';
// import Link from 'next/link';
// import { useRouter } from 'next/router';
import {Box, Stack, TextField, Button, Typography, Container, AppBar, Toolbar, Grid } from '@mui/material'
// import {useState, useRef, useEffect} from 'react'
// import styles from "./page.module.css";

export default function Home() 
{
  // const router = useRouter()
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
        <Button color="inherit" href="/profile"> <Image src="/pfp.png" alt="Description of Image" height={'50'} width={'50'} />  </Button>
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
