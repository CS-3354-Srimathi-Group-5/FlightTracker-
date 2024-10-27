// Jahnavi Dhulipalla
// Filter flight status

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

// Modify filterDFWFlights to filter by status if provided
function filterDFWFlights(flights, status = null) {
    return flights.filter(flight => {
      const dep_iata = flight.departure?.iata || '';
      const arr_iata = flight.arrival?.iata || '';
      
      // Check if the flight is related to DFW
      const isDFW = dep_iata === 'DFW' || arr_iata === 'DFW';
  
      // Filter by status if a status filter is provided
      const matchesStatus = status ? flight.flight_status.toLowerCase() === status.toLowerCase() : true;
  
      return isDFW && matchesStatus;
    });
  }
  
  // Route to search flights by status
  app.get('/api/flights/status/:status', async (req, res) => {
    const status = req.params.status; // Flight status to filter by (e.g., on-time, delayed)
  
    try {
      console.log(`Searching for flights with status: ${status}`);
      const response = await axios.get('http://api.aviationstack.com/v1/flights', {
        params: {
          access_key: API_KEY,
        },
      });
  
      const dfwFlights = filterDFWFlights(response.data.data, status).map(formatFlightData);
  
      if (dfwFlights.length === 0) {
        return res.status(404).json({ message: `No flights with status "${status}" found for DFW` });
      }
  
      res.json(dfwFlights);
    } catch (error) {
      console.error('Error fetching flight data by status:', error.message);
      res.status(500).json({ message: 'Error fetching flight data', details: error.message });
    }
  });
// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });  