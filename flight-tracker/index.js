const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;

// Enable CORS for frontend communication
app.use(cors());

// AviationStack API Key
const API_KEY = process.env.API_KEY || '9806658acd76f2bf3bebfac9d15d078d'; // Replace with your actual API key

// Function to calculate flight duration
function calculateFlightDuration(flight) {
  const departureTimeStr = flight.departure.actual || flight.departure.estimated || flight.departure.scheduled;
  const arrivalTimeStr = flight.arrival.actual || flight.arrival.estimated || flight.arrival.scheduled;

  const timeDeparted = new Date(departureTimeStr);
  const timeLanded = new Date(arrivalTimeStr);

  if (isNaN(timeDeparted) || isNaN(timeLanded)) return 'Unknown duration';

  const duration = (timeLanded - timeDeparted) / (1000 * 60); // Convert ms to minutes
  return duration > 0 ? `${Math.round(duration)} minutes` : 'Invalid duration';
}

// Function to format flight data
function formatFlightData(flight) {
  return {
    departure: {
      airport: flight.departure?.airport || 'Unknown',
      iata: flight.departure?.iata || 'Unknown',
      location: {
        lat: flight.departure?.latitude || null,
        lon: flight.departure?.longitude || null,
      },
      scheduled: flight.departure?.scheduled || 'Unknown',
      estimated: flight.departure?.estimated || 'Unknown',
      actual: flight.departure?.actual || 'Unknown',
    },
    arrival: {
      airport: flight.arrival?.airport || 'Unknown',
      iata: flight.arrival?.iata || 'Unknown',
      location: {
        lat: flight.arrival?.latitude || null,
        lon: flight.arrival?.longitude || null,
      },
      scheduled: flight.arrival?.scheduled || 'Unknown',
      estimated: flight.arrival?.estimated || 'Unknown',
      actual: flight.arrival?.actual || 'Unknown',
    },
    airline: flight.airline?.name || 'Unknown',
    flightNumber: flight.flight?.number || 'Unknown',
    status: flight.flight_status || 'Unknown',
    duration: calculateFlightDuration(flight),
    live: flight.live && flight.live.latitude && flight.live.longitude ? {
      latitude: flight.live.latitude,
      longitude: flight.live.longitude,
      altitude: flight.live.altitude,
      speed: flight.live.speed_horizontal,
    } : null,
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

    if (!response.data || !response.data.data) {
      return res.status(500).json({ message: 'Invalid response from AviationStack API' });
    }

    const flights = response.data.data.map(formatFlightData);

    if (flights.length === 0) {
      return res.status(404).json({ message: 'Flight not related to DFW' });
    }

    res.json(flights);
  } catch (error) {
    console.error('Error fetching flight data:', error.message);
    res.status(500).json({ message: 'Error fetching flight data', details: error.message });
  }
});

// Route to search flights by route
app.get('/api/flights/route', async (req, res) => {
  const { departure, arrival } = req.query;

  // Ensure both departure and arrival are provided
  if (!departure || !arrival) {
    return res.status(400).json({ message: 'Departure and arrival IATA codes are required.' });
  }

  // Ensure one of the cities is DFW
  if (departure !== 'DFW' && arrival !== 'DFW') {
    return res.status(400).json({ message: 'One of the cities must be Dallas-Fort Worth (DFW).' });
  }

  try {
    console.log(`Searching for flights from ${departure} to ${arrival}`);
    const response = await axios.get('http://api.aviationstack.com/v1/flights', {
      params: {
        access_key: API_KEY,
        dep_iata: departure,
        arr_iata: arrival,
      },
    });

    if (!response.data || !response.data.data) {
      return res.status(500).json({ message: 'Invalid response from AviationStack API' });
    }

    const flights = response.data.data.map(formatFlightData);

    if (flights.length === 0) {
      return res.status(404).json({ message: 'No flights found for the specified route.' });
    }

    res.json(flights);
  } catch (error) {
    console.error('Error fetching flight data by route:', error.message);
    res.status(500).json({ message: 'Error fetching flight data by route', details: error.message });
  }
});

// Route to get arrivals to Dallas (DFW)
app.get('/api/flights/arrivals', async (req, res) => {
  try {
    console.log('Fetching arrivals to DFW');
    const response = await axios.get('http://api.aviationstack.com/v1/flights', {
      params: {
        access_key: API_KEY,
        arr_iata: 'DFW',
        limit: 20,
      },
    });

    if (!response.data || !response.data.data) {
      return res.status(500).json({ message: 'Invalid response from AviationStack API' });
    }

    const flights = response.data.data.map(formatFlightData);

    if (flights.length === 0) {
      return res.status(404).json({ message: 'No arrivals related to DFW' });
    }

    res.json(flights);
  } catch (error) {
    console.error('Error fetching arrivals:', error.message);
    res.status(500).json({ message: 'Error fetching arrivals', details: error.message });
  }
});

// Route to get departures from Dallas (DFW)
app.get('/api/flights/departures', async (req, res) => {
  try {
    console.log('Fetching departures from DFW');
    const response = await axios.get('http://api.aviationstack.com/v1/flights', {
      params: {
        access_key: API_KEY,
        dep_iata: 'DFW',
        limit: 20,
      },
    });

    if (!response.data || !response.data.data) {
      return res.status(500).json({ message: 'Invalid response from AviationStack API' });
    }

    const flights = response.data.data.map(formatFlightData);

    if (flights.length === 0) {
      return res.status(404).json({ message: 'No departures related to DFW' });
    }

    res.json(flights);
  } catch (error) {
    console.error('Error fetching departures:', error.message);
    res.status(500).json({ message: 'Error fetching departures', details: error.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
