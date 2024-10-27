// Load environment variables
require('dotenv').config({ path: '.env.local' });
const express = require('express');
const axios = require('axios');
const cors = require('cors');

// Initialize Express app
const app = express();
const PORT = 5001;
app.use(cors());
const API_KEY = process.env.AVIATION_STACK_API_KEY;

// Route to get flight duration by flight number
app.get('/flight-duration/:flightNumber', async (req, res) => {
  const flightNumber = req.params.flightNumber;

  try {
    const response = await axios.get('http://api.aviationstack.com/v1/flights', {
      params: {
        access_key: API_KEY,
        flight_iata: flightNumber,
      },
    });

    const flightData = response.data.data[0];

    if (flightData) {
      // Log flightData for debugging
      console.log(flightData);

      // Check if both departure and arrival times are valid
      const timeDeparted = new Date(flightData.departure?.actual);
      const timeLanded = new Date(flightData.arrival?.actual);

      // Ensure both times are valid dates
      if (isNaN(timeDeparted) || isNaN(timeLanded)) {
        return res.status(500).json({ error: 'Invalid departure or arrival time.' });
      }

      const duration = (timeLanded - timeDeparted) / (1000 * 60); // Duration in minutes

      // Ensure duration is positive
      if (duration < 0) {
        return res.status(500).json({ error: 'Arrival time is before departure time.' });
      }

      const flightInfo = {
        departure_city: flightData.departure.airport || 'Unknown',
        arrival_city: flightData.arrival.airport || 'Unknown',
        flight_duration: `${duration} minutes`,
      };

      res.json(flightInfo);
    } else {
      res.status(404).json({ message: 'Flight not found' });
    }
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ error: 'Error fetching flight data' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
