import React, { useState } from 'react';
import axios from 'axios';
import { 
  sortFlightsByDepartureTime, 
  sortFlightsByArrivalTime, 
  sortFlightsByAirlineName, 
  sortFlightsByStatus, 
  sortFlightsByFlightNumber 
} from './FlightSorting';

const FlightSearch = ({ onFlightsUpdate }) => {
  const [flightNumber, setFlightNumber] = useState('');
  const [flights, setFlights] = useState([]); // State to store flights
  const [error, setError] = useState(''); // State for error messages
  const [sortCriteria, setSortCriteria] = useState('departure'); // Default sort criteria

  // Handle search by flight number
  const searchByFlightNumber = async () => {
    try {
      const response = await axios.get(`http://localhost:5001/api/flights/number/${flightNumber}`);
      let sortedFlights = response.data; // Initial unsorted flights

      // Sort based on the selected criteria
      switch (sortCriteria) {
        case 'departure':
          sortedFlights = sortFlightsByDepartureTime(sortedFlights);
          break;
        case 'arrival':
          sortedFlights = sortFlightsByArrivalTime(sortedFlights);
          break;
        case 'airline':
          sortedFlights = sortFlightsByAirlineName(sortedFlights);
          break;
        case 'status':
          sortedFlights = sortFlightsByStatus(sortedFlights);
          break;
        case 'flightNumber':
          sortedFlights = sortFlightsByFlightNumber(sortedFlights);
          break;
        default:
          break;
      }

      setFlights(sortedFlights); // Update local state with sorted flights
      onFlightsUpdate(sortedFlights); // Update parent component with sorted flights
      setError(''); // Clear any previous error
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setError('This flight is not related to DFW.');
      } else {
        setError('An error occurred while fetching flight data.');
      }
      setFlights([]); // Clear flight data if there's an error
      onFlightsUpdate([]); // Clear flight data in parent component
    }
  };

  return (
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
      <div>
        <label>Sort by:</label>
        <select value={sortCriteria} onChange={(e) => setSortCriteria(e.target.value)}>
          <option value="departure">Departure Time</option>
          <option value="arrival">Arrival Time</option>
          <option value="airline">Airline Name</option>
          <option value="status">Flight Status</option>
          <option value="flightNumber">Flight Number</option>
        </select>
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}

      {flights.length > 0 && (
        <div>
          <h3>Flight Results</h3>
          <ul>
            {flights.map((flight, index) => (
              <li key={index}>
                <strong>Flight Number:</strong> {flight.flight_number}<br />
                <strong>Airline:</strong> {flight.airline_name}<br />
                <strong>Departure:</strong> {flight.departure_city}<br />
                <strong>Arrival:</strong> {flight.arrival_city}<br />
                <strong>Departure Time:</strong> {new Date(flight.time_departed).toLocaleString()}<br />
                <strong>Arrival Time:</strong> {new Date(flight.time_arrived).toLocaleString()}<br />
                <strong>Status:</strong> {flight.status}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FlightSearch; 