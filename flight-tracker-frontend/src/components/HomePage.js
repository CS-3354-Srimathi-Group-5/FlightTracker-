import React from 'react';
import backgroundGif from '../assets/plane.gif';
import logo from '../assets/AeroScopeLogo.png';
import { Box, Stack, Button, Typography, AppBar, Toolbar } from '@mui/material';

const HomePage = () => {
    return (
        <Box
            sx={{
                width: '100%',
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                // backgroundColor: '#f5f5f5',
                // background: 'linear-gradient(to bottom, #f5f5f5, #59788e)',
                backgroundImage: `url(${backgroundGif})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
            }}
        >
            {/* Navigation Bar */}
            {/* <AppBar position="static" sx={{ backgroundColor: '#59788e' }}>
                <Toolbar>
                    <Button color="inherit" href="/">
                        <img src="/back.png" alt="Back" height="30" />
                    </Button>
                    <Typography
                        variant="h4"
                        sx={{ flexGrow: 1, textAlign: 'center', color: '#fff' }}
                    >
                        AeroScope
                    </Typography>
                    <Button color="inherit" href="/profile">
                        <img src="/pfp.png" alt="Profile" height="30" />
                    </Button>
                </Toolbar>
            </AppBar> */}

            {/* Main Content */}
            <Stack
                sx={{
                    width: '85%',
                    height: '70%',
                    border: '2px solid #ccc',
                    borderRadius: 5,
                    p: 3,
                    mt: 5,
                    // background: 'linear-gradient(to bottom, #f5f5f5, #002c4a)',
                    background: 'linear-gradient(to bottom, rgba(245, 245, 245, 0.9), rgba(0, 44, 74, 0.9))',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    alignItems: 'center',
                }}
            >
                {/* <img src={logo} alt="Description of Image" height={'100'} width={'100'} /> */}
                <Typography variant="h4" color="#0044ff" sx={{ mb: 2 }}>
                    Welcome to AeroScope!
                </Typography>
                <Typography variant="h6" color="#002c4a" sx={{ mb: 4 }}>
                    DFW International Airport
                </Typography>

                {/* Section Links */}
                <Stack
                    direction="row"
                    justifyContent="center"
                    spacing={5}
                    sx={{ width: '100%' }}
                >
                    {/* Flight Info Section */}
                    <Stack
                        direction="column"
                        spacing={2}
                        alignItems="center"
                        sx={{
                            width: '30%',
                            backgroundColor: '#e6f7e8',
                            p: 3,
                            borderRadius: 2,
                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                        }}
                    >
                        <Typography variant="h5">Flight Info</Typography>
                        <Button
                            variant="contained"
                            href="https://www.dfwairport.com/flights/"
                            sx={{
                                backgroundColor: '#02840f',
                                width: '100%',
                                '&:hover': {
                                    backgroundColor: '#04691d', // Darker green on hover
                                    color: '#fff',
                                },
                            }}
                        >
                            Current Flights
                        </Button>
                        <Button
                            variant="contained"
                            href="/flightsearchmap"
                            sx={{
                                backgroundColor: '#02840f',
                                width: '100%',
                                '&:hover': {
                                    backgroundColor: '#04691d', // Darker green on hover
                                    color: '#fff',
                                },
                            }}
                        >
                            Flight Search
                        </Button>
                        <Button
                            variant="contained"
                            href="/flightboard"
                            sx={{
                                backgroundColor: '#02840f',
                                width: '100%',
                                '&:hover': {
                                    backgroundColor: '#04691d', // Darker green on hover
                                    color: '#fff',
                                },
                            }}
                        >
                            Flight Board
                        </Button>
                    </Stack>

                    {/* Transportation Section */}
                    <Stack
                        direction="column"
                        spacing={2}
                        alignItems="center"
                        sx={{
                            width: '30%',
                            backgroundColor: '#e0f0ff',
                            p: 3,
                            borderRadius: 2,
                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                        }}
                    >
                        <Typography variant="h5">Transportation</Typography>
                        <Button
                            variant="contained"
                            href="https://www.dfwairport.com/park/"
                            sx={{
                                backgroundColor: 'blue',
                                width: '100%',
                                '&:hover': {
                                    backgroundColor: '#0047ab', // Lighter blue on hover
                                    color: '#fff',
                                },
                            }}
                        >
                            Parking Lots
                        </Button>
                        <Button
                            variant="contained"
                            href="https://www.avis.com/en/reservation#/vehicles"
                            sx={{
                                backgroundColor: 'blue',
                                width: '100%',
                                '&:hover': {
                                    backgroundColor: '#0047ab', // Lighter blue on hover
                                    color: '#fff',
                                },
                            }}
                        >
                            Car Rental
                        </Button>
                        <Button
                            variant="contained"
                            href="https://www.dfwairport.com/shuttles/"
                            sx={{
                                backgroundColor: 'blue',
                                width: '100%',
                                '&:hover': {
                                    backgroundColor: '#0047ab', // Lighter blue on hover
                                    color: '#fff',
                                },
                            }}
                        >
                            Shuttle Service
                        </Button>
                    </Stack>

                    {/* Shopping Section */}
                    <Stack
                        direction="column"
                        spacing={2}
                        alignItems="center"
                        sx={{
                            width: '30%',
                            backgroundColor: '#ffe6d5',
                            p: 3,
                            borderRadius: 2,
                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                        }}
                    >
                        <Typography variant="h5">Shop at DFW</Typography>
                        <Button
                            variant="contained"
                            href="https://www.dfwairport.com/shop-dine-services/"
                            sx={{
                                backgroundColor: '#cc5500',
                                width: '100%',
                                '&:hover': {
                                    backgroundColor: '#e67300', // Brighter orange on hover
                                    color: '#fff',
                                },
                            }}
                        >
                            Restaurants
                        </Button>
                        <Button
                            variant="contained"
                            href="https://sites.dfwairport.com/landhere/developmentplan/hospitality/index.php"
                            sx={{
                                backgroundColor: '#cc5500',
                                width: '100%',
                                '&:hover': {
                                    backgroundColor: '#e67300', // Brighter orange on hover
                                    color: '#fff',
                                },
                            }}
                        >
                            Air Hotel
                        </Button>
                    </Stack>
                </Stack>

                <Typography
                    variant="h6"
                    color="#fff"
                    textAlign="center"
                    sx={{ fontStyle: 'italic', mt: 4 }}
                >
                    Thank you for visiting! For more information, please go to:{' '}
                    <a href="https://www.dfwairport.com/" style={{ color: '#00ddff' }}>
                        dfwairport.com
                    </a>
                </Typography>
            </Stack>
        </Box>
    );
};

export default HomePage;
