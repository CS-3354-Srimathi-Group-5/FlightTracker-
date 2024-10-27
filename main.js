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
      console.log(flightData);

      // Check if flight status is 'cancelled' to skip calculation
      if (flightData.flight_status === 'cancelled') {
        return res.status(500).json({ error: 'Flight is cancelled. Duration unavailable.' });
      }

      // Use actual times if available; otherwise, fall back to estimated or scheduled times
      const timeDeparted = new Date(flightData.departure.actual || flightData.departure.estimated || flightData.departure.scheduled);
      const timeLanded = new Date(flightData.arrival.actual || flightData.arrival.estimated || flightData.arrival.scheduled);

      // Ensure both times are valid dates
      if (isNaN(timeDeparted) || isNaN(timeLanded)) {
        return res.status(500).json({ error: 'Invalid departure or arrival time.' });
      }

      const duration = (timeLanded - timeDeparted) / (1000 * 60); // Duration in minutes

      // Handle cases where arrival time is before departure time
      if (duration < 0) {
        return res.status(500).json({ error: 'Arrival time is before departure time.' });
      }

      // Customize duration message based on flight status
      let durationMessage;
      if (flightData.flight_status === 'scheduled') {
        durationMessage = `Scheduled flight duration: ${duration} minutes`;
      } else if (flightData.flight_status === 'en-route') {
        durationMessage = `Estimated flight duration (in-transit): ${duration} minutes`;
      } else {
        durationMessage = `Actual flight duration: ${duration} minutes`;
      }

      const flightInfo = {
        departure_city: flightData.departure.airport || 'Unknown',
        arrival_city: flightData.arrival.airport || 'Unknown',
        flight_duration: durationMessage,
      };

      res.json(flightInfo);
    } else {
      res.status(404).json({ message: 'Flight not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching flight data' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
