import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import HomePage from './components/HomePage';
import FlightBoard from './components/FlightBoard';
import FlightSearchMap from './components/FlightSearchMap';

const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <Link to="/">Home</Link>
        </nav>

        <Routes>
          {/* Homepage route */}
          <Route path="/" element={<HomePage />} />
          <Route path="/flightsearchmap" element={<FlightSearchMap />} />
          <Route path="/flightboard" element={<FlightBoard />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
