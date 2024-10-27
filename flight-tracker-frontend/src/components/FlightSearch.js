//Everyone worked on this file
//FlightSearch component allows users to search for flights by flight number

import React, { useState } from 'react';
import axios from 'axios';

//Worked on by Jahnavi, Bukunmi, Manish, and Warren
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
      
      // Update the parent component with the fetched flight data
      onFlightsUpdate(response.data);
      setError(''); // Clear any previous error if the fetch is successful
    } catch (error) {
      // If the server returns a 404 status, it means the flight isn't related to DFW
      if (error.response && error.response.status === 404) {
        setError('This flight is not related to DFW.');
      } else {
        // Handle any other errors that may occur
        setError('An error occurred while fetching flight data.');
      }
      
      // Clear flight data in the parent component if there's an error
      onFlightsUpdate([]);
    }
  };

//Worked on by Nowsin, Rayyan, and Ashraful  
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
