import React from 'react';
import logo from './assets/AeroScopeLogo.png';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { ClerkProvider, RedirectToSignIn, SignedIn, SignedOut, SignIn, SignUp, useClerk, UserButton } from '@clerk/clerk-react';
import HomePage from './components/HomePage';
import FlightBoard from './components/FlightBoard';
import FlightSearchMap from './components/FlightSearchMap';
import Profile from './components/Profile';
import Favorites from './components/Favorites';

// const clerkPublishableKey = process.env.VITE_CLERK_PUBLISHABLE_KEY;
const clerkPublishableKey = 'pk_test_c2hhcmluZy1taW5rLTkyLmNsZXJrLmFjY291bnRzLmRldiQ'; // Replace with your Clerk publishable key


const App = () => {
  return (
    <ClerkProvider publishableKey={clerkPublishableKey}>
      <Router>
        <Box>
          {/* Navigation bar */}
          <AppBar position="static" sx={{ backgroundColor: "#002c4a" }}>
            <Toolbar>
              <img src={logo} alt="Description of Image" height={'70'} width={'75'} />
              <Typography variant="h6" sx={{ flexGrow: 1, color:"#fff" }}>
                AeroScope
              </Typography>
              <Button sx={{color:"#fff"}} component={Link} to="/">
                Home
              </Button>
              <Button sx={{color:"#fff", p:2}} component={Link} to="/profile">
                Profile 
              </Button>
              <SignedIn>
                {/* <SignOutButton /> */}
                <UserButton />
              </SignedIn>
              <SignedOut>
                <Button color="inherit" component={Link} to="/sign-in">
                  Sign In
                </Button>
                <Button color="inherit" component={Link} to="/sign-up">
                  Sign Up
                </Button>
              </SignedOut>
            </Toolbar>
          </AppBar>

          {/* Routes for different pages */}
          <Routes>
            <Route path="/sign-in" element={<CenteredContainer><SignIn /></CenteredContainer>} />
            <Route path="/sign-up" element={<CenteredContainer><SignUp /></CenteredContainer>} />
            <Route
              path="*"
              element={
                <SignedIn>
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/flightsearchmap" element={<FlightSearchMap />} />
                    <Route path="/flightboard" element={<FlightBoard />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/profile/favorites" element={<Favorites />} />
                    <Route path="/protected" element={<ProtectedPage />} />
                  </Routes>
                </SignedIn>
              }
            />
            <Route
              path="*"
              element={
                <SignedOut>
                  <Route path="/sign-up" element={<CenteredContainer><SignUp /></CenteredContainer>} />
                </SignedOut>
              }
            />
          </Routes>
        </Box>
      </Router>
    </ClerkProvider>
  );
};

const SignOutButton = () => {
  const { signOut } = useClerk();
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut().then(() => {
      navigate('/sign-in');
    });
  };

  return (
    <Button color="inherit" onClick={handleSignOut}>
      Sign Out
    </Button>
  );
};

const Welcome = () => {
  return (
    <Box sx={{ textAlign: 'center', marginTop: '20px' }}>
      <Typography variant="h4" sx={{color:"#fff"}}>Welcome to AeroScope</Typography>
      <Typography variant="body1" sx={{color:"#fff"}}>Please sign in or sign up to continue.</Typography>
    </Box>
  );
};

const CenteredContainer = ({ children }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      {children}
    </Box>
  );
};

const ProtectedPage = () => {
  return <div>Protected Content</div>;
};

export default App;
