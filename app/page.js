/* ---------------------------------------------------------------------------------
AeroScope Home Page 
by Ashraful Islam

test cases by Ashraful:
 - F9.1: home page to display DFW airport information
 - F11.1: saving + display favorite flights

App tool bar has 4 functions: back, map, home, profile
 - back goes back to the page/level user came from
 - map shows the terminal map view of the airport
 - home goes to the home page of the app
 - profile shows the user's profile
  - update info
  - settings
  - favorites
     - save new flight
     - delete saved flight
  - delete account

  Please see README.md to run code
--------------------------------------------------------------------------------- */

'use client'
// import Router from 'next/router';
// import Link from 'next/link';
// import { useRouter } from 'next/router';
// import {useState, useRef, useEffect} from 'react'
// import styles from "./page.module.css";
import Image from "next/image";
import {Box, Stack, TextField, Button, Typography, Container, AppBar, Toolbar, Grid } from '@mui/material'
import { UserButton, SignedIn, SignedOut } from '@clerk/nextjs'

export default function Home() 
{
  // const router = useRouter(); //onClick={() => router.back()
  return (
  <Box 
    width="100vw" 
    height="100vh" 
    display="flex"
    flexDirection="column"
    // justifyContent="center"
    alignItems="center">
    {/* <Stack direction={'row'} display={'flex'}>
      <Image src="/AeroScopeLogo.png" alt="Description of Image" height={'75'} width={'75'} />
      <Typography variant={'h4'} color={'#339fff'} padding={2}>
        AeroScope
      </Typography>
    </Stack> */}
      
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
      <Stack direction="column" spacing={1} alignItems={'center'}>
          {/* <Image src="/AeroScopeLogo.png" alt="Description of Image" height={'100'} width={'100'} /> */}
            <Typography variant={'h4'} color={'#0033ff'} padding={1}>
              Welcome to AeroScope!
            </Typography>
            <Typography variant={'h6'} color={'#59788e'} sx={{ fontStyle: 'italic' }}>
              Flight Tracker Application & Guide to DFW International Airport
            </Typography>
      </Stack>

      {/* grid draft for home page links. Implementation Comming Soon */}
      <Stack direction="row" alignItems={'center'} spacing={5}>
        <Stack direction="column" spacing={5} alignItems={'center'} width="50%">
            <h2>Flight Info</h2>
            <Button variant = "contained" href="https://www.dfwairport.com/flights/" target="_blank" sx={{backgroundColor: "#02840f"}}>Current Flights</Button>
            <Button variant = "contained" href="/" color="success">Globe View</Button>
            <Button variant = "contained" href="https://www.dfwairport.com/explore/plan/customs/" target="_blank" color="success">Customs Info</Button>
        </Stack>
        <Stack direction="column" spacing={5} alignItems={'center'} width="50%">
            <h2>Transporation</h2>
            <Button variant = "contained" href="https://www.dfwairport.com/park/" target="_blank" sx={{backgroundColor: "blue"}}>Parking Lots</Button>
            <Button variant = "contained" href="https://www.dfwairport.com/explore/transportation/rentalcars/" target="_blank">Car Rental</Button>
            <Button variant = "contained" href="https://www.dfwairport.com/shuttles/" target="_blank">Shuttle Service</Button>
        </Stack>
        <Stack direction="column" spacing={5} alignItems={'center'} width="50%">
            <h2>Shop DFW Airport</h2>
            <Button variant = "contained" href="https://www.dfwairport.com/shop-dine-services/" target="_blank" sx={{backgroundColor: "#cc5500"}}>Resturants</Button>
            <Button variant = "contained" href="https://www.dfwairport.com/business/opportunities/commercial-development/on-airport-hotels/" target="_blank" color="warning">Hotels</Button>
            <Button variant = "contained" href="https://www.dfwairport.com/shop-dine-services/" target="_blank" color="warning">Souvieners</Button>
        </Stack>
      </Stack>
      <Typography variant={'h6'} color={'#003359'} textAlign={'center'} padding={2} sx={{ fontStyle: 'italic' }}>
          Thank you for visiting! For more information, please go to: <a href="https://www.dfwairport.com/" target="_blank">dfwairport.com</a>. Website developed by Team 5
      </Typography>
    </Stack>
  </Box>
  );
}