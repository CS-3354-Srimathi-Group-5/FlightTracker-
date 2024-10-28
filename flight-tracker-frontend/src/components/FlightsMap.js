import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import FlightPath from './FlightPath';

// Helper function to validate if a coordinate is correct
const isValidCoordinate = (lat, lon) => lat !== null && lon !== null && !isNaN(lat) && !isNaN(lon);

// Airport coordinates database
const AIRPORT_COORDINATES = {
  "Dallas/Fort Worth International": [32.8998, -97.0403],
  "Los Angeles International": [33.9416, -118.4085],
  // Add more airports as needed
};

const FlightsMap = ({ flights }) => {
  const mapCenter = [32.8998, -97.0403]; // DFW Airport coordinates
  const mapZoom = 7;

  // Helper function to determine if a flight is live
  const isLiveFlight = (flight) => flight.live && isValidCoordinate(flight.live.latitude, flight.live.longitude);

  // Helper function to get coordinates for an airport
  const getAirportCoordinates = (airportName) => {
    const coords = AIRPORT_COORDINATES[airportName];
    if (!coords) {
      console.warn(`Missing coordinates for airport: ${airportName}`);
      return null;
    }
    return coords;
  };

  return (
    <div style={{ height: '600px', width: '100%' }}>
      <h2>DFW-Related Flights</h2>
      <MapContainer center={mapCenter} zoom={mapZoom} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* Render flights data if available */}
        {flights.map((flight, index) => {
          // Get departure and arrival coordinates from our database
          const departurePosition = getAirportCoordinates(flight.departure.airport);
          const arrivalPosition = getAirportCoordinates(flight.arrival.airport);
          const livePosition = isLiveFlight(flight)
            ? [flight.live.latitude, flight.live.longitude]
            : null;

          return (
            <React.Fragment key={index}>
              {/* Render departure airport */}
              {departurePosition && (
                <Marker position={departurePosition}>
                  <Popup>
                    <strong>Departure: {flight.departure.airport}</strong><br />
                    Scheduled: {new Date(flight.departure.scheduled).toLocaleString()}<br />
                    {flight.departure.actual && `Actual: ${new Date(flight.departure.actual).toLocaleString()}`}
                  </Popup>
                  <Circle center={departurePosition} pathOptions={{ color: 'green' }} radius={10000} />
                </Marker>
              )}

              {/* Render arrival airport */}
              {arrivalPosition && (
                <Marker position={arrivalPosition}>
                  <Popup>
                    <strong>Arrival: {flight.arrival.airport}</strong><br />
                    Scheduled: {new Date(flight.arrival.scheduled).toLocaleString()}<br />
                    {flight.arrival.actual && `Actual: ${new Date(flight.arrival.actual).toLocaleString()}`}
                  </Popup>
                  <Circle center={arrivalPosition} pathOptions={{ color: 'red' }} radius={10000} />
                </Marker>
              )}

              {/* Render live aircraft position */}
              {livePosition && (
                <Marker position={livePosition}>
                  <Popup>
                    <strong>{flight.airline} Flight {flight.flightNumber}</strong><br />
                    <strong>Live Data:</strong><br />
                    Altitude: {Math.round(flight.live.altitude)} meters<br />
                    Speed: {Math.round(flight.live.speed)} km/h
                  </Popup>
                  <Circle center={livePosition} pathOptions={{ color: 'blue' }} radius={5000} />
                </Marker>
              )}

              {/* Add the flight path only for live flights */}
              {livePosition && <FlightPath flight={flight} />}
            </React.Fragment>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default FlightsMap;
