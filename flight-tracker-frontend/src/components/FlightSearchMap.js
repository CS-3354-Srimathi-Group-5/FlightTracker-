import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import FlightsMap from './FlightsMap';
import backgroundGif from '../assets/plane.gif';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Alert,
  Stack,
} from '@mui/material';

const FlightSearchMap = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const initialFlightNumber = params.get('flightNumber'); // Get initial flight number from URL query

  const [flightNumber, setFlightNumber] = useState(initialFlightNumber || '');
  const [departure, setDeparture] = useState('');
  const [arrival, setArrival] = useState('');
  const [flights, setFlights] = useState([]);
  const [error, setError] = useState('');

  const isFlightRelatedToDFW = (flight) => {
    return flight.departure.iata === 'DFW' || flight.arrival.iata === 'DFW';
  };

  const searchByFlightNumber = async () => {
    try {
      const response = await axios.get(`http://localhost:5001/api/flights/number/${flightNumber}`);
      if (response.data && response.data.length > 0) {
        const dfwFlights = response.data.filter(isFlightRelatedToDFW);
        if (dfwFlights.length > 0) {
          setFlights(dfwFlights); // Update flights state with fetched data
          setError(''); // Clear error if fetch is successful
        } else {
          setError('This flight is not related to DFW.');
          setFlights([]); // Clear flights if there's an issue
        }
      } else {
        setError('Flight details could not be retrieved.');
        setFlights([]); // Clear flights if there's an issue
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setError('This flight is not related to DFW.');
      } else {
        setError('An error occurred while fetching flight data.');
      }
      setFlights([]);
    }
  };

  const searchByRoute = async () => {
    const departureUpper = departure.toUpperCase();
    const arrivalUpper = arrival.toUpperCase();

    if (departureUpper !== 'DFW' && arrivalUpper !== 'DFW') {
      setError('One of the cities must be Dallas-Fort Worth (DFW).');
      setFlights([]);
      return;
    }

    try {
      console.log(`Searching for flights from ${departureUpper} to ${arrivalUpper}`);
      const response = await axios.get(
        `http://localhost:5001/api/flights/route?departure=${departureUpper}&arrival=${arrivalUpper}`
      );
      console.log('Response data:', response.data);
      if (response.data && response.data.length > 0) {
        const dfwFlights = response.data.filter(isFlightRelatedToDFW);
        if (dfwFlights.length > 0) {
          setFlights(dfwFlights); // Update flights state with fetched data
          setError(''); // Clear error if fetch is successful
        } else {
          setError('No flights found for the specified route related to DFW.');
          setFlights([]); // Clear flights if there's an issue
        }
      } else {
        setError('No flights found for the specified route.');
        setFlights([]); // Clear flights if there's an issue
      }
    } catch (error) {
      console.error('Error fetching flight data:', error);
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError('An error occurred while fetching flight data.');
      }
      setFlights([]);
    }
  };

  // Automatically search if an initial flight number is provided
  useEffect(() => {
    if (initialFlightNumber) {
      searchByFlightNumber();
    }
  }, [initialFlightNumber]);

  return (
    <Box sx={{
      width: '100%',
      minheight: '100vh',
      position: 'relative',
      padding: 10,
      backgroundImage: `url(${backgroundGif})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      overflow: 'hidden',
      boxSizing: 'border-box',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.8)', // 80% opaque white overlay
        zIndex: 1,
      },
      '& > *': {
        position: 'relative',
        zIndex: 2, // Ensure content is above the overlay
      },
    }}
    >
      <Box sx={{ maxWidth: 800, margin: 'auto', padding: 3 }}>
        <Card sx={{ marginBottom: 3 }}>
          <CardContent>
            <Typography variant="h4" gutterBottom>
              Flight Search & Map
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {/* Search by Flight Number */}
              <Stack spacing={2}>
                <TextField
                  label="Flight Number"
                  variant="outlined"
                  value={flightNumber}
                  onChange={(e) => setFlightNumber(e.target.value)}
                  fullWidth
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={searchByFlightNumber}
                  fullWidth
                  disabled={!flightNumber.trim()}
                >
                  Search by Flight Number
                </Button>
              </Stack>

              {/* Search by Route */}
              <Stack direction="row" spacing={2} alignItems="center">
                <TextField
                  label="Departure Airport (IATA Code)"
                  variant="outlined"
                  value={departure}
                  onChange={(e) => setDeparture(e.target.value)}
                  fullWidth
                />
                <TextField
                  label="Arrival Airport (IATA Code)"
                  variant="outlined"
                  value={arrival}
                  onChange={(e) => setArrival(e.target.value)}
                  fullWidth
                />
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={searchByRoute}
                  disabled={!departure.trim() || !arrival.trim()}
                >
                  Search by Route
                </Button>
              </Stack>
            </Box>
            {/* Error message display */}
            {error && (
              <Alert severity="error" sx={{ marginTop: 2 }}>
                {error}
              </Alert>
            )}
          </CardContent>
        </Card>

        {/* FlightsMap component for displaying flights on the map */}
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Flight Map
            </Typography>
            {flights.length > 0 ? (
              <FlightsMap flights={flights} />
            ) : (
              <Typography color="textSecondary">
                Enter a flight number or route to view its details on the map.
              </Typography>
            )}
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default FlightSearchMap;