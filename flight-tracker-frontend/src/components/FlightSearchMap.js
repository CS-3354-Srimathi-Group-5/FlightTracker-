import React, { useState } from 'react';
import FlightSearch from './FlightSearch';
import FlightsMap from './FlightsMap';

const FlightSearchMap = () => {
  const [flights, setFlights] = useState([]); // State to hold the search results

  // Function to update flights data based on search results
  const handleFlightsUpdate = (newFlights) => {
    setFlights(newFlights);
  };

  return (
    <div>
      <h2>Flight Search & Map</h2>

      {/* Flight Search Component */}
      <FlightSearch onFlightsUpdate={handleFlightsUpdate} />

      {/* Flight Map Component, passing the flights state */}
      <FlightsMap flights={flights} />
    </div>
  );
};

export default FlightSearchMap;
