// Everyone worked on this file
// FlightSearch component allows users to search for flights by flight number

// Test Cases:
// F5.1: Search Flight by Flight Number - Test search by entering a valid, live flight number
//       User inputs a flight number -> Display flight details (departure/arrival times, status).
// F5.2: Search Flight by Flight Number - Ensure error handling for invalid flight number
//       User inputs an incorrect flight number -> Error message indicates flight not found.

import React, { useState } from 'react';
import axios from 'axios';

// Worked on by Jahnavi, Bukunmi, Manish, and Warren
// FlightSearch component allows users to search for flights by flight number
const FlightSearch = ({ onFlightsUpdate }) => {
  // State to store the user's input flight number
  const [flightNumber, setFlightNumber] = useState('');
  // State to handle and display any error messages
  const [error, setError] = useState(''); 

  // Function to handle search by flight number
  const searchByFlightNumber = async () => {
    try {
      // Send a GET request to fetch flight data based on the flight number
      const response = await axios.get(`http://localhost:5001/api/flights/number/${flightNumber}`);
      
      // Test Case F5.1: If a valid flight number is entered, display the flight details
      if (response.data && response.data.length > 0) {
        onFlightsUpdate(response.data); // Update the parent component with the fetched flight data
        setError(''); // Clear any previous error if the fetch is successful
      } else {
        // This case should not occur under normal conditions if the data is valid
        setError('Flight details could not be retrieved.');
        onFlightsUpdate([]); // Clear flight data if there's an issue
      }
    } catch (error) {
      // Test Case F5.2: Error handling for invalid or incorrect flight number
      if (error.response && error.response.status === 404) {
        setError('This flight is not related to DFW.'); // Display error message for 404 status
      } else {
        // Handle any other errors that may occur
        setError('An error occurred while fetching flight data.');
      }
      
      // Clear flight data in the parent component if there's an error
      onFlightsUpdate([]);
    }
  };


  //Worked on by Nowsin, Rayyan, and Ashraful
  // Return the JSX for the FlightSearch
  // Input field for entering the flight number
  // Button to trigger the search
  // Display error message if any error occurs
  return (
    <div>
      <h2>Search Flights</h2>
      <div>
        {/* Input field for entering the flight number */}
        <input
          type="text"
          placeholder="Flight Number"
          value={flightNumber}
          onChange={(e) => setFlightNumber(e.target.value)} // Update state on input change
        />
        {/* Button to trigger the search */}
        <button onClick={searchByFlightNumber}>Search by Flight Number</button>
      </div>
      
      {/* Display error message if any error occurs */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default FlightSearch;
