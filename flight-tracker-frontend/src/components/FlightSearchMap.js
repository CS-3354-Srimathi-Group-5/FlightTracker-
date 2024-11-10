// Rayyan Waris
// Use Case: Combined component for searching a flight and displaying it on the map

import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import FlightsMap from './FlightsMap';

// FlightSearchMap component integrates search and map display
const FlightSearchMap = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const initialFlightNumber = params.get('flightNumber'); // Get initial flight number from URL query

  const [flightNumber, setFlightNumber] = useState(initialFlightNumber || '');
  const [flights, setFlights] = useState([]);
  const [error, setError] = useState('');

  // Function to handle search by flight number
  const searchByFlightNumber = async () => {
    try {
      const response = await axios.get(`http://localhost:5001/api/flights/number/${flightNumber}`);
      
      if (response.data && response.data.length > 0) {
        setFlights(response.data); // Update flights state with fetched data
        setError(''); // Clear error if fetch is successful
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

  // Automatically search if an initial flight number is provided
  useEffect(() => {
    if (initialFlightNumber) {
      searchByFlightNumber();
    }
  }, [initialFlightNumber]);

  return (
    <div>
      <h1>Flight Search & Map</h1>

      {/* Flight Search Section */}
      <div>
        <h2>Search Flights</h2>
        <div>
          <input
            type="text"
            placeholder="Flight Number"
            value={flightNumber}
            onChange={(e) => setFlightNumber(e.target.value)}
          />
          <button onClick={searchByFlightNumber}>Search by Flight Number</button>
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>

      {/* FlightsMap component for displaying flights on the map */}
      <FlightsMap flights={flights} />
    </div>
  );
};

export default FlightSearchMap;
