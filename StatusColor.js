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

// AviationStack API Key (ensure to move back to environment variable)
const API_KEY = '9806658acd76f2bf3bebfac9d15d078d';

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
        return 'blue'; // Use blue as a default for statuses like "in-air" or "arrived"
    }
  }
  
  // Function to format flight data consistently with color coding
  function formatFlightData(flight) {
    const status = flight.flight_status || 'Unknown';
  
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
      flightNumber: flight.flight.number,
      status,
      statusColor: getStatusColor(status) // Adding status color based on flight status
    };

    // Start the server
    app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

