// Jahnavi Dhulipalla
// Flight status color

const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;

// Enable CORS for frontend communication
app.use(cors());

// AviationStack API Key (from environment variable or hardcoded)
const API_KEY = process.env.AVIATIONSTACK_API_KEY || '9806658acd76f2bf3bebfac9d15d078d';

// Function to determine color based on flight status
function getStatusColor(status) {
  switch (status.toLowerCase()) {
    case 'scheduled':
    case 'on-time':
      return 'green';
    case 'delayed':
      return 'red';
    case 'cancelled':
      return 'gray';
    default:
      return 'blue'; // Default for statuses like "in-air" or "arrived"
  }
}

// Function to format flight data consistently with color coding
function formatFlightData(flight) {
  const status = flight.flight_status || 'Unknown';

  return {
    departure: {
      airport: flight.departure?.airport || 'Unknown',
      location: {
        lat: flight.departure?.latitude || null,
        lon: flight.departure?.longitude || null
      },
      scheduled: flight.departure?.scheduled || 'Unknown',
      estimated: flight.departure?.estimated || 'Unknown',
      actual: flight.departure?.actual || 'Unknown'
    },
    arrival: {
      airport: flight.arrival?.airport || 'Unknown',
      location: {
        lat: flight.arrival?.latitude || null,
        lon: flight.arrival?.longitude || null
      },
      scheduled: flight.arrival?.scheduled || 'Unknown',
      estimated: flight.arrival?.estimated || 'Unknown',
      actual: flight.arrival?.actual || 'Unknown'
    },
    live: flight.live && flight.live.latitude !== null && flight.live.longitude !== null ? {
      latitude: flight.live.latitude,
      longitude: flight.live.longitude,
      altitude: flight.live.altitude,
      speed: flight.live.speed_horizontal
    } : null,
    airline: flight.airline?.name || 'Unknown',
    flightNumber: flight.flight?.number || 'Unknown',
    status,
    statusColor: getStatusColor(status) // Adding status color based on flight status
  };
}

// Route to get flights with status and color coding
app.get('/api/flights', async (req, res) => {
  try {
    const response = await axios.get('http://api.aviationstack.com/v1/flights', {
      params: { access_key: API_KEY }
    });

    const flights = response.data.data || [];
    const formattedFlights = flights.map(formatFlightData);

    res.json(formattedFlights);
  } catch (error) {
    console.error('Error fetching flight data:', error.message);
    res.status(500).json({ message: 'Error fetching flight data', details: error.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}/api/flights`);
});
