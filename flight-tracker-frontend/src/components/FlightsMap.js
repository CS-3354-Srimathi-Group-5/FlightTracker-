// Everyone worked on this file
// FlightMap component displays a map with markers for flights related to DFW

import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// Bukunmi, Ashraful, and Jahnavi worked on this part
// Test Cases:
// F16.1: Flight Radar - Verify radar view for real-time flight positions
//        Real-time data available -> Flight positions are displayed on the radar.
// F14.1: View Flight Path on Map - Validate display of flight path on map
//        User selects a valid flight -> Map shows real-time/planned flight path.

// Helper function to validate if a coordinate is correct
const isValidCoordinate = (lat, lon) => lat !== null && lon !== null && !isNaN(lat) && !isNaN(lon);

// Helper function to convert UTC time to CST and bump 5 hours ahead
const formatToCST = (time) => {
  if (!time) return 'N/A';
  
  // Parse the input time as UTC
  const date = new Date(time);
  
  // Add 5 hours to the current UTC time
  date.setHours(date.getHours() + 5);
  
  // Convert the adjusted time to CST
  return date.toLocaleString('en-US', {
    timeZone: 'America/Chicago',
    hour12: true,
    weekday: 'long',
    month: 'short',
    day: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

// Manish, Warren, and Nowsin worked on this part
// React component for displaying the flights map
const FlightsMap = ({ flights }) => {
  // Set the initial center of the map to DFW Airport coordinates
  const mapCenter = [32.8998, -97.0403]; // DFW Airport coordinates
  const mapZoom = 7; // Initial zoom level for the map

  // Helper function to determine if a flight is currently live
  const isLiveFlight = (flight) => flight.live && isValidCoordinate(flight.live.latitude, flight.live.longitude);

  return (
    <div style={{ height: '600px', width: '100%' }}>
      <h2>DFW-Related Flights</h2>
      {/* Initialize the map container with the center and zoom */}
      <MapContainer center={mapCenter} zoom={mapZoom} style={{ height: '100%', width: '100%' }}>
        {/* Add a TileLayer for the map (OpenStreetMap in this case) */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* Iterate over the flights data to render markers */}
        {flights.map((flight, index) => {
          // Validate the coordinates for departure and arrival locations
          const departurePosition = isValidCoordinate(flight.departure.location.lat, flight.departure.location.lon)
            ? [flight.departure.location.lat, flight.departure.location.lon]
            : null;

          const arrivalPosition = isValidCoordinate(flight.arrival.location.lat, flight.arrival.location.lon)
            ? [flight.arrival.location.lat, flight.arrival.location.lon]
            : null;

          // Get the live position of the flight if it's live
          const livePosition = isLiveFlight(flight)
            ? [flight.live.latitude, flight.live.longitude]
            : null;

          // Rayyan worked on this part
          return (
            // Use React Fragment to avoid extra DOM elements
            <React.Fragment key={index}>
              {/* Test Case F14.1: Render a marker for the departure airport (WORK IN PROGRESS)*/}
              {departurePosition && (
                <Marker position={departurePosition}>
                  <Popup>
                    <strong>Departure Airport: {flight.departure.airport}</strong><br />
                    Scheduled: {formatToCST(flight.departure.scheduled)}<br />
                    Estimated: {formatToCST(flight.departure.estimated)}<br />
                    Actual: {formatToCST(flight.departure.actual)}
                  </Popup>
                  {/* Circle to represent departure airport */}
                  <Circle center={departurePosition} pathOptions={{ color: 'red' }} radius={10000} />
                </Marker>
              )}
              {/* Test Case F14.1: Render a marker for the arrival airport (WORK IN PROGRESS)*/}
              {arrivalPosition && (
                <Marker position={arrivalPosition}>
                  <Popup>
                    <strong>Arrival Airport: {flight.arrival.airport}</strong><br />
                    Scheduled: {formatToCST(flight.arrival.scheduled)}<br />
                    Estimated: {formatToCST(flight.arrival.estimated)}<br />
                    Actual: {formatToCST(flight.arrival.actual)}
                  </Popup>
                  {/* Circle to represent arrival airport */}
                  <Circle center={arrivalPosition} pathOptions={{ color: 'red' }} radius={10000} />
                </Marker>
              )}
              {/* Test Case F16.1: Render a marker for the live position of the flight */}
              {livePosition && (
                <Marker position={livePosition}>
                  <Popup>
                    <strong>{flight.airline} Flight {flight.flightNumber}</strong><br />
                    <strong>Live Location</strong><br />
                    Altitude: {flight.live.altitude} meters<br />
                    Speed: {flight.live.speed} km/h<br />
                    <strong>Flight Details:</strong><br />
                    <em>Departure:</em> {flight.departure.airport}<br />
                    <em>Arrival:</em> {flight.arrival.airport}<br />
                    Scheduled Departure: {formatToCST(flight.departure.scheduled)}<br />
                    Estimated Departure: {formatToCST(flight.departure.estimated)}<br />
                    Actual Departure: {formatToCST(flight.departure.actual)}<br />
                    Scheduled Arrival: {formatToCST(flight.arrival.scheduled)}<br />
                    Estimated Arrival: {formatToCST(flight.arrival.estimated)}<br />
                  </Popup>
                  {/* Circle to represent live flight position */}
                  <Circle center={livePosition} pathOptions={{ color: 'blue' }} radius={5000} />
                </Marker>
              )}
            </React.Fragment>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default FlightsMap;
