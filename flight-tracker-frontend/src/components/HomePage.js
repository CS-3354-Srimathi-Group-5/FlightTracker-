'use client'
import { Box, Stack, Button, Typography, AppBar, Toolbar } from '@mui/material';

export default function HomePage() {
    return (
        <Box 
            width="100vw" 
            height="100vh" 
            display="flex"
            flexDirection="column"
            alignItems="center"
        >
            {/* App Toolbar for Navigation */}
            {/* <AppBar position="static" sx={{ backgroundColor: "#59788e" }}>
                <Toolbar>
                    <Button color="inherit" href="/"> 
                        <Image src="/back.png" alt="Back" height="50" width="50" />  
                    </Button>
                    <Button color="inherit" href="/terminal_map"> 
                        <Image src="/map.png" alt="Map" height="40" width="40" /> 
                    </Button>
                    <Typography variant="h4" style={{ flexGrow: 1 }} textAlign="center" padding={0} color="white">
                        AeroScope
                    </Typography>
                    <Image src="/AeroScopeLogoV2.png" alt="AeroScope Logo" height="150" width="150" />
                    <Typography variant="h4" style={{ flexGrow: 1 }} textAlign="center" padding={0} color="white">
                    </Typography>
                    <Button color="inherit" href="/"> 
                        <Image src="/home.png" alt="Home" height="40" width="40" /> 
                    </Button>
                    <Button color="inherit" href="/profile"> 
                        <Image src="/pfp.png" alt="Profile" height="50" width="50" /> 
                    </Button>
                </Toolbar>
            </AppBar> */}

            {/* Main Content Area */}
            <Stack
                direction="column"
                width="85%"
                height="75%"
                border="2px solid black"
                borderRadius={5}
                p={2}
                spacing={3}
                alignItems="center"
            >
                <Typography variant="h4" color="#0033ff" padding={1}>
                    Welcome to AeroScope!
                </Typography>
                <Typography variant="h6" color="#59788e">
                    DFW International Airport
                </Typography>

                {/* Links to Different Sections */}
                <Stack direction="row" justifyContent="center" spacing={5}>
                    {/* Flight Info Section */}
                    <Stack direction="column" spacing={3} alignItems="center" width="30%">
                        <Typography variant="h5">Flight Info</Typography>
                        <Button variant="contained" href="https://www.dfwairport.com/flights/" sx={{ backgroundColor: "#02840f" }}>
                            Current Flights
                        </Button>
                        <Button variant="contained" href="/flightsearchmap" sx={{ backgroundColor: "#02840f" }}>
                            Flight Search
                        </Button>
                        <Button variant="contained" href="/flightboard" sx={{ backgroundColor: "#02840f" }}>
                            Flight Board
                        </Button>
                    </Stack>

                    {/* Transportation Section */}
                    <Stack direction="column" spacing={3} alignItems="center" width="30%">
                        <Typography variant="h5">Transportation</Typography>
                        <Button variant="contained" href="https://www.dfwairport.com/park/" sx={{ backgroundColor: "blue" }}>
                            Parking Lots
                        </Button>
                        <Button variant="contained" href="https://www.avis.com/en/reservation#/vehicles" sx={{ backgroundColor: "blue" }}>
                            Car Rental
                        </Button>
                        <Button variant="contained" href="https://www.dfwairport.com/shuttles/" sx={{ backgroundColor: "blue" }}>
                            Shuttle Service
                        </Button>
                    </Stack>

                    {/* Shopping Section */}
                    <Stack direction="column" spacing={3} alignItems="center" width="30%">
                        <Typography variant="h5">Shop at DFW</Typography>
                        <Button variant="contained" href="https://www.dfwairport.com/shop-dine-services/" sx={{ backgroundColor: "#cc5500" }}>
                            Restaurants
                        </Button>
                        <Button variant="contained" href="https://sites.dfwairport.com/landhere/developmentplan/hospitality/index.php" sx={{ backgroundColor: "#cc5500" }}>
                            Air Hotel
                        </Button>
                    </Stack>
                </Stack>

                <Typography variant="h6" color="#0033ff" textAlign="center" padding={2} sx={{ fontStyle: 'italic' }}>
                    Thank you for visiting! For more information, please go to: <a href="https://www.dfwairport.com/">dfwairport.com</a>
                </Typography>
            </Stack>
        </Box>
    );
}
