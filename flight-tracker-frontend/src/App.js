import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import HomePage from './components/HomePage';
import FlightBoard from './components/FlightBoard';
import FlightSearchMap from './components/FlightSearchMap';
import Profile from './components/Profile';
import Favorites from './components/Favorites';

const App = () => {
  return (
    <Router>
      <Box>
        {/* Navigation bar */}
        <AppBar position="static" sx={{ backgroundColor: "#59788e" }}>
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              AeroScope
            </Typography>
            <Button color="inherit" component={Link} to="/">
              Home
            </Button>
            <Button color="inherit" component={Link} to="/profile">
              Profile
            </Button>
          </Toolbar>
        </AppBar>

        {/* Routes for different pages */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/flightsearchmap" element={<FlightSearchMap />} />
          <Route path="/flightboard" element={<FlightBoard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/favorites" element={<Favorites />} /> 
        </Routes>
      </Box>
    </Router>
  );
};

export default App;
