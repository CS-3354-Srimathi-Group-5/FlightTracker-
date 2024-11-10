// Everyone worked on this file
// FlightMap component displays a map with markers for flights related to DFW

import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import FlightPath from './FlightPath'; // Import the FlightPath component
import 'leaflet/dist/leaflet.css';

// Bukunmi, Ashraful, and Jahnavi worked on this part
// Test Cases:
// F16.1: Flight Radar - Verify radar view for real-time flight positions
//        Real-time data available -> Flight positions are displayed on the radar.
// F14.1: View Flight Path on Map - Validate display of flight path on map
//        User selects a valid flight -> Map shows real-time/planned flight path.

// Helper function to validate if a coordinate is correct
const isValidCoordinate = (lat, lon) => lat !== null && lon !== null && !isNaN(lat) && !isNaN(lon);

// Helper function to convert UTC time to CST
const formatToCST = (time) => {
  if (!time) return 'N/A';
  
  const date = new Date(time);
  date.setHours(date.getHours() + 5);
  
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
  const mapCenter = [32.8998, -97.0403];
  const mapZoom = 7;

  const isLiveFlight = (flight) => flight.live && isValidCoordinate(flight.live.latitude, flight.live.longitude);

  return (
    <div style={{ height: '600px', width: '100%' }}>
      <h2>DFW-Related Flights</h2>
      <MapContainer center={mapCenter} zoom={mapZoom} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {flights.map((flight, index) => {
          const departurePosition = isValidCoordinate(flight.departure.location.lat, flight.departure.location.lon)
            ? [flight.departure.location.lat, flight.departure.location.lon]
            : null;

          const arrivalPosition = isValidCoordinate(flight.arrival.location.lat, flight.arrival.location.lon)
            ? [flight.arrival.location.lat, flight.arrival.location.lon]
            : null;

          const livePosition = isLiveFlight(flight)
            ? [flight.live.latitude, flight.live.longitude]
            : null;

          // Rayyan worked on this part
          return (
            <React.Fragment key={index}>
              {departurePosition && (
                <Marker position={departurePosition}>
                  <Popup>
                    <strong>Departure Airport: {flight.departure.airport}</strong><br />
                    Scheduled: {formatToCST(flight.departure.scheduled)}<br />
                    Estimated: {formatToCST(flight.departure.estimated)}<br />
                    Actual: {formatToCST(flight.departure.actual)}<br />
                    Total Duration: {flight.duration}
                  </Popup>
                  <Circle center={departurePosition} pathOptions={{ color: 'red' }} radius={10000} />
                </Marker>
              )}
              {arrivalPosition && (
                <Marker position={arrivalPosition}>
                  <Popup>
                    <strong>Arrival Airport: {flight.arrival.airport}</strong><br />
                    Scheduled: {formatToCST(flight.arrival.scheduled)}<br />
                    Estimated: {formatToCST(flight.arrival.estimated)}<br />
                    Actual: {formatToCST(flight.arrival.actual)}<br />
                    Total Duration: {flight.duration}
                  </Popup>
                  <Circle center={arrivalPosition} pathOptions={{ color: 'red' }} radius={10000} />
                </Marker>
              )}
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
                    Total Duration: {flight.duration}
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
