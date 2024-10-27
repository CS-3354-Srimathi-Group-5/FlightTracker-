import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FlightBoard = () => {
  const [arrivals, setArrivals] = useState([]);
  const [departures, setDepartures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to convert UTC time to 12-hour format and Central Time, then add 5 hours
  const formatTimeToCentral = (utcTime) => {
    if (!utcTime) return 'Unknown';
    
    // Convert UTC time to a JavaScript Date object
    const date = new Date(utcTime);
    
    // Convert to Central Time
    const centralTime = new Date(date.toLocaleString('en-US', { timeZone: 'America/Chicago' }));
    
    // Add 5 hours to the Central Time
    centralTime.setHours(centralTime.getHours() + 5);

    // Format the adjusted time to 12-hour format
    return centralTime.toLocaleString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
      month: 'numeric',
      day: 'numeric',
      year: 'numeric'
    });
  };

  useEffect(() => {
    const fetchFlightData = async () => {
      try {
        setLoading(true);

        // Fetch arrivals and departures from your backend
        const arrivalsResponse = await axios.get('http://localhost:5001/api/flights/arrivals');
        const departuresResponse = await axios.get('http://localhost:5001/api/flights/departures');

        setArrivals(arrivalsResponse.data);
        setDepartures(departuresResponse.data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching flight data');
        setLoading(false);
      }
    };

    fetchFlightData();
  }, []);

  if (loading) return <div>Loading flight data...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Flight Board - Dallas (DFW)</h1>
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
