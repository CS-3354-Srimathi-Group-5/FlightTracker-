import React, { useState } from 'react';
import FlightSearch from './components/FlightSearch';
import FlightsMap from './components/FlightsMap';
import FlightBoard from './components/FlightBoard'; // Assuming you still have FlightBoard

const App = () => {
  const [flights, setFlights] = useState([]); // State to hold the search results

  // Function to update flights data based on search results
  const handleFlightsUpdate = (newFlights) => {
    setFlights(newFlights);
  };

  return (
    <div>
      <h1>DFW Flight Tracker</h1>
      {/* Optional: Static Flight Board Component */}
      <FlightBoard />

      {/* Flight Search Component */}
      <FlightSearch onFlightsUpdate={handleFlightsUpdate} />

      {/* Flight Map Component, passing the flights state */}
      <FlightsMap flights={flights} />
    </div>
  );
};

export default App;
