const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;

// Enable CORS for frontend communication
app.use(cors());

// Hardcoded AviationStack API Key (ensure to move back to environment variable after fixing)
const API_KEY = '9806658acd76f2bf3bebfac9d15d078d'; // Replace with your actual API key

// Add logging to check the coordinates received from the API
function filterDFWFlights(flights) {
  return flights.filter(flight => {
    const dep_iata = flight.departure?.iata || '';
    const arr_iata = flight.arrival?.iata || '';
    
    // Check if the flight is related to DFW
    const isDFW = dep_iata === 'DFW' || arr_iata === 'DFW';
    
    // Log coordinates for debugging
    if (isDFW) {
      const depLat = flight.departure?.location?.lat || 'No Latitude';
      const depLon = flight.departure?.location?.lon || 'No Longitude';
      const arrLat = flight.arrival?.location?.lat || 'No Latitude';
      const arrLon = flight.arrival?.location?.lon || 'No Longitude';
      
      console.log(`DFW-related Flight Found: ${dep_iata} -> ${arr_iata}`);
      console.log(`Departure Coordinates: Lat ${depLat}, Lon ${depLon}`);
      console.log(`Arrival Coordinates: Lat ${arrLat}, Lon ${arrLon}`);
    }
    
    return isDFW;
  });
}


function formatFlightData(flight) {
  return {
    departure: {
      airport: flight.departure.airport,
      location: {
        lat: flight.departure.latitude || null,
        lon: flight.departure.longitude || null
      },
      scheduled: flight.departure.scheduled || 'Unknown',
      estimated: flight.departure.estimated || 'Unknown',
      actual: flight.departure.actual || 'Unknown'
    },
    arrival: {
      airport: flight.arrival.airport,
      location: {
        lat: flight.arrival.latitude || null,
        lon: flight.arrival.longitude || null
      },
      scheduled: flight.arrival.scheduled || 'Unknown',
      estimated: flight.arrival.estimated || 'Unknown',
      actual: flight.arrival.actual || 'Unknown'
    },
    live: flight.live && flight.live.latitude !== null && flight.live.longitude !== null ? {
      latitude: flight.live.latitude,
      longitude: flight.live.longitude,
      altitude: flight.live.altitude,
      speed: flight.live.speed_horizontal
    } : null,
    airline: flight.airline.name,
    flightNumber: flight.flight.number
  };
}




// Route to search flights by flight number
app.get('/api/flights/number/:flightNumber', async (req, res) => {
  const flightNumber = req.params.flightNumber;
  try {
    console.log(`Searching for flight number: ${flightNumber}`);
    const response = await axios.get('http://api.aviationstack.com/v1/flights', {
      params: {
        access_key: API_KEY,
        flight_iata: flightNumber,
      },
    });

    const dfwFlights = filterDFWFlights(response.data.data).map(formatFlightData);

    if (dfwFlights.length === 0) {
      return res.status(404).json({ message: 'Flight not related to DFW' });
    }

    res.json(dfwFlights);
  } catch (error) {
    console.error('Error fetching flight data:', error.message);
    res.status(500).json({ message: 'Error fetching flight data', details: error.message });
  }
});

// Route to search flights by date
app.get('/api/flights/date/:date', async (req, res) => {
  const date = req.params.date; // Format: YYYY-MM-DD
  try {
    console.log(`Searching for flights on date: ${date}`);
    const response = await axios.get('http://api.aviationstack.com/v1/flights', {
      params: {
        access_key: API_KEY,
        flight_date: date,
      },
    });

    const dfwFlights = filterDFWFlights(response.data.data).map(formatFlightData);

    if (dfwFlights.length === 0) {
      return res.status(404).json({ message: 'No flights related to DFW for this date' });
    }

    res.json(dfwFlights);
  } catch (error) {
    console.error('Error fetching flight data by date:', error.message);
    res.status(500).json({ message: 'Error fetching flight data', details: error.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
