// server.js
const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;

// Enable CORS for frontend communication
app.use(cors());

// AviationStack API Key (ensure to move back to environment variable)
const API_KEY = 'YOUR_API_KEY';

// Function to filter DFW flights
function filterDFWFlights(flights) {
  return flights.filter(flight => {
    const dep_iata = flight.departure?.iata || '';
    const arr_iata = flight.arrival?.iata || '';

    // Check if the flight is related to DFW
    const isDFW = dep_iata === 'DFW' || arr_iata === 'DFW';

    // Log coordinates for debugging if related to DFW
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

// Function to calculate the flight duration
function calculateFlightDuration(flight) {
  const departureTimeStr = flight.departure.actual || flight.departure.estimated || flight.departure.scheduled;
  const arrivalTimeStr = flight.arrival.actual || flight.arrival.estimated || flight.arrival.scheduled;

  const timeDeparted = departureTimeStr ? new Date(departureTimeStr) : null;
  const timeLanded = arrivalTimeStr ? new Date(arrivalTimeStr) : null;

  // Validation check of the dates fetched from the API
  if (!timeDeparted || !timeLanded || isNaN(timeDeparted) || isNaN(timeLanded)) {
    return 'Invalid departure or arrival time.';
  }

  // Calculating the duration of the flight in minutes
  const duration = (timeLanded - timeDeparted) / (1000 * 60);

  // Check if arrival time is before departure time
  if (duration < 0) {
    return 'Arrival time is before departure time.';
  }

  // Displaying duration message based on flight status
  if (flight.flight_status === 'scheduled') {
    return `Scheduled flight duration is ${Math.round(duration)} minutes.`;
  } else if (flight.flight_status === 'en-route') {
    return `Estimated flight duration (in-transit) is ${Math.round(duration)} minutes.`;
  } else {
    return `Total flight duration is ${Math.round(duration)} minutes.`;
  }
}

// Function to format flight data consistently
function formatFlightData(flight) {
  return {
    departure: {
      airport: flight.departure.airport,
      iata: flight.departure.iata || 'Unknown',
      location: {
        lat: flight.departure.latitude || null,
        lon: flight.departure.longitude || null,
      },
      scheduled: flight.departure.scheduled || 'Unknown',
      estimated: flight.departure.estimated || 'Unknown',
      actual: flight.departure.actual || 'Unknown',
    },
    arrival: {
      airport: flight.arrival.airport,
      iata: flight.arrival.iata || 'Unknown',
      location: {
        lat: flight.arrival.latitude || null,
        lon: flight.arrival.longitude || null,
      },
      scheduled: flight.arrival.scheduled || 'Unknown',
      estimated: flight.arrival.estimated || 'Unknown',
      actual: flight.arrival.actual || 'Unknown',
    },
    live: flight.live && flight.live.latitude !== null && flight.live.longitude !== null ? {
      latitude: flight.live.latitude,
      longitude: flight.live.longitude,
      altitude: flight.live.altitude,
      speed: flight.live.speed_horizontal,
    } : null,
    airline: flight.airline.name,
    flightNumber: flight.flight.number,
    status: flight.flight_status || 'Unknown',
    duration: calculateFlightDuration(flight), // Calculate and include duration
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

    if (!response.data || !response.data.data) {
      return res.status(500).json({ message: 'Invalid response from AviationStack API' });
    }

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

// Route to get arrivals to Dallas (DFW)
app.get('/api/flights/arrivals', async (req, res) => {
  try {
    console.log('Fetching arrivals to DFW');
    const response = await axios.get('http://api.aviationstack.com/v1/flights', {
      params: {
        access_key: API_KEY,
        arr_iata: 'DFW',  // Fetch arrivals for Dallas-Fort Worth
        limit: 20,        // Adjust limit as needed
      },
    });

    if (!response.data || !response.data.data) {
      return res.status(500).json({ message: 'Invalid response from AviationStack API' });
    }

    const dfwFlights = response.data.data.map(formatFlightData);

    if (dfwFlights.length === 0) {
      return res.status(404).json({ message: 'No arrivals related to DFW' });
    }

    res.json(dfwFlights);
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
        dep_iata: 'DFW',  // Fetch departures for Dallas-Fort Worth
        limit: 20,        // Adjust limit as needed
      },
    });

    if (!response.data || !response.data.data) {
      return res.status(500).json({ message: 'Invalid response from AviationStack API' });
    }

    const dfwFlights = response.data.data.map(formatFlightData);

    if (dfwFlights.length === 0) {
      return res.status(404).json({ message: 'No departures related to DFW' });
    }

    res.json(dfwFlights);
  } catch (error) {
    console.error('Error fetching departures:', error.message);
    res.status(500).json({ message: 'Error fetching departures', details: error.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
