// Rayyan Waris 
// Use Case: View flight board to check the status of arrivals or departures at DFW Airport.

// Test Case:
// F15.1: View Flight Board - Verify if arrivals and departures are shown for DFW
//        User views the website -> System shows correct flight board with accurate data.

import React, { useEffect, useState } from 'react';
import axios from 'axios';

// FlightBoard component displays arrival and departure flight data for DFW
const FlightBoard = () => {
  // State to store arrival and departure flight data
  const [arrivals, setArrivals] = useState([]);
  const [departures, setDepartures] = useState([]);
  // Loading state to indicate when data is being fetched
  const [loading, setLoading] = useState(true);
  // Error state to handle any issues with fetching data
  const [error, setError] = useState(null);

  // Function to format UTC time to 12-hour format in Central Time, then add 5 hours
  const formatTimeToCentral = (utcTime) => {
    if (!utcTime) return 'Unknown';
    
    // Convert UTC time to a JavaScript Date object
    const date = new Date(utcTime);
    
    // Convert the date to Central Time
    const centralTime = new Date(date.toLocaleString('en-US', { timeZone: 'America/Chicago' }));
    
    // Add 5 hours to the Central Time
    centralTime.setHours(centralTime.getHours() + 5);

    // Format the adjusted time to 12-hour format with a readable string
    return centralTime.toLocaleString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
      month: 'numeric',
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Fetch flight data when the component mounts
  useEffect(() => {
    const fetchFlightData = async () => {
      try {
        setLoading(true); // Set loading state to true while fetching data

        // Fetch arrivals and departures data from the backend API
        const arrivalsResponse = await axios.get('http://localhost:5001/api/flights/arrivals');
        const departuresResponse = await axios.get('http://localhost:5001/api/flights/departures');

        // Update state with fetched data
        setArrivals(arrivalsResponse.data);
        setDepartures(departuresResponse.data);
        setLoading(false); // Stop loading when data is fetched
      } catch (error) {
        // Set an error message if the request fails
        setError('Error fetching flight data');
        setLoading(false); // Stop loading in case of an error
      }
    };

    fetchFlightData(); // Call the fetch function
  }, []);

  // Display a loading message while fetching data
  if (loading) return <div>Loading flight data...</div>;
  // Display an error message if data fetching fails
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Flight Board - Dallas (DFW)</h1>
      {/* Arrivals Section */}
      <div>
        <h2>Arrivals</h2>
        <table>
          <thead>
            <tr>
              <th>Flight</th>
              <th>Airline</th>
              <th>From</th>
              <th>Status</th>
              <th>Scheduled Arrival</th>
            </tr>
          </thead>
          <tbody>
            {/* Map through arrivals data and create a table row for each flight */}
            {arrivals.map((flight, index) => (
              <tr key={index}>
                <td>{flight.flightNumber}</td>
                <td>{flight.airline}</td>
                <td>{flight.departure.iata}</td>
                <td>{flight.status}</td>
                <td>{formatTimeToCentral(flight.arrival.scheduled)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Departures Section */}
      <div>
        <h2>Departures</h2>
        <table>
          <thead>
            <tr>
              <th>Flight</th>
              <th>Airline</th>
              <th>To</th>
              <th>Status</th>
              <th>Scheduled Departure</th>
            </tr>
          </thead>
          <tbody>
            {/* Map through departures data and create a table row for each flight */}
            {departures.map((flight, index) => (
              <tr key={index}>
                <td>{flight.flightNumber}</td>
                <td>{flight.airline}</td>
                <td>{flight.arrival.iata}</td>
                <td>{flight.status}</td>
                <td>{formatTimeToCentral(flight.departure.scheduled)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FlightBoard;
