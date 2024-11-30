import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import FlightPath from './FlightPath';
import L from 'leaflet';
import { Plane, Clock, Calendar, Navigation, Ruler, Wind, ArrowUp, MapPin } from 'lucide-react';

// Import Leaflet CSS
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const isValidCoordinate = (lat, lon) => lat !== null && lon !== null && !isNaN(lat) && !isNaN(lon);

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
    minute: '2-digit',
  });
};

const calculateProgress = (flight) => {
  if (!flight.departure.actual || !flight.arrival.estimated) return 0;
  const now = new Date();
  const start = new Date(flight.departure.actual);
  const end = new Date(flight.arrival.estimated);
  const progress = ((now - start) / (end - start)) * 100;
  return Math.min(Math.max(progress, 0), 100);
};

const calculateDelay = (scheduled, estimated) => {
  if (!scheduled || !estimated) return 0;
  return Math.round((new Date(estimated) - new Date(scheduled)) / (1000 * 60));
};

const customIcon = (color) =>
  new L.Icon({
    iconUrl: `https://cdn-icons-png.flaticon.com/512/787/787446.png`,
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30],
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    className: `leaflet-div-icon-${color}`,
  });

const FlightsMap = ({ flights }) => {
  const mapCenter = [32.8998, -97.0403];
  const mapZoom = 7;

  const isLiveFlight = (flight) =>
    flight.live && isValidCoordinate(flight.live.latitude, flight.live.longitude);

  const FlightStatus = ({ flight }) => {
    const delay = calculateDelay(flight.arrival.scheduled, flight.arrival.estimated);
    const status = delay > 15 ? 'Delayed' : delay < -15 ? 'Early' : 'On Time';
    const statusColor = delay > 15 ? 'text-red-500' : delay < -15 ? 'text-green-500' : 'text-blue-500';
    
    return (
      <div className={`font-bold ${statusColor} text-lg mb-2`}>
        {status} {delay !== 0 && `(${Math.abs(delay)} minutes ${delay > 0 ? 'delay' : 'early'})`}
      </div>
    );
  };

  const ProgressBar = ({ progress }) => (
    <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2 mb-4">
      <div 
        className="bg-blue-600 h-2.5 rounded-full transition-all duration-500"
        style={{ width: `${progress}%` }}
      />
    </div>
  );

  return (
    <div style={{ position: 'relative', height: '600px', width: '100%' }}>
      <h2 className="text-center mb-2.5 text-xl font-bold">DFW-Related Flights</h2>
      <div style={{ position: 'absolute', top: '40px', bottom: 0, width: '100%' }}>
        <MapContainer 
          center={mapCenter} 
          zoom={mapZoom} 
          style={{ height: '100%', width: '100%' }}
          scrollWheelZoom={true}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />

          {flights.map((flight, index) => {
            const departurePosition = isValidCoordinate(
              flight.departure.location.lat,
              flight.departure.location.lon
            ) ? [flight.departure.location.lat, flight.departure.location.lon] : null;

            const arrivalPosition = isValidCoordinate(
              flight.arrival.location.lat,
              flight.arrival.location.lon
            ) ? [flight.arrival.location.lat, flight.arrival.location.lon] : null;

            const livePosition = isLiveFlight(flight)
              ? [flight.live.latitude, flight.live.longitude]
              : null;

            return (
              <React.Fragment key={index}>
                {departurePosition && (
                  <Marker position={departurePosition} icon={customIcon('red')}>
                    <Popup className="custom-popup">
                      <div className="max-w-md">
                        <div className="flex items-center gap-2 text-red-600 font-bold mb-2">
                          <MapPin size={16} />
                          <span>Departure: {flight.departure.airport}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <div className="flex items-center gap-1 text-gray-600">
                              <Calendar size={14} />
                              <span>Scheduled</span>
                            </div>
                            {formatToCST(flight.departure.scheduled)}
                          </div>
                          <div>
                            <div className="flex items-center gap-1 text-gray-600">
                              <Clock size={14} />
                              <span>Actual</span>
                            </div>
                            {formatToCST(flight.departure.actual)}
                          </div>
                        </div>
                      </div>
                    </Popup>
                    <Circle center={departurePosition} pathOptions={{ color: 'red' }} radius={10000} />
                  </Marker>
                )}

                {arrivalPosition && (
                  <Marker position={arrivalPosition} icon={customIcon('green')}>
                    <Popup className="custom-popup">
                      <div className="max-w-md">
                        <div className="flex items-center gap-2 text-green-600 font-bold mb-2">
                          <MapPin size={16} />
                          <span>Arrival: {flight.arrival.airport}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <div className="flex items-center gap-1 text-gray-600">
                              <Calendar size={14} />
                              <span>Scheduled</span>
                            </div>
                            {formatToCST(flight.arrival.scheduled)}
                          </div>
                          <div>
                            <div className="flex items-center gap-1 text-gray-600">
                              <Clock size={14} />
                              <span>Estimated</span>
                            </div>
                            {formatToCST(flight.arrival.estimated)}
                          </div>
                        </div>
                      </div>
                    </Popup>
                    <Circle center={arrivalPosition} pathOptions={{ color: 'green' }} radius={10000} />
                  </Marker>
                )}

                {livePosition && (
                  <Marker position={livePosition} icon={customIcon('blue')}>
                    <Popup className="custom-popup">
                      <div className="max-w-md">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-2">
                            <Plane className="text-blue-600" size={24} />
                            <span className="font-bold text-xl">
                              {flight.airline} {flight.flightNumber}
                            </span>
                          </div>
                          <FlightStatus flight={flight} />
                        </div>

                        <ProgressBar progress={calculateProgress(flight)} />

                        <div className="grid grid-cols-2 gap-6 mb-4">
                          <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-2 font-semibold text-red-600">
                              <MapPin size={16} />
                              <span>From: {flight.departure.airport}</span>
                            </div>
                            <div className="text-sm ml-6">
                              {formatToCST(flight.departure.actual)}
                            </div>
                          </div>
                          <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-2 font-semibold text-green-600">
                              <MapPin size={16} />
                              <span>To: {flight.arrival.airport}</span>
                            </div>
                            <div className="text-sm ml-6">
                              {formatToCST(flight.arrival.estimated)}
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                          <div className="flex items-center gap-2">
                            <ArrowUp size={16} className="text-purple-600" />
                            <div>
                              <div className="text-sm text-gray-600">Altitude</div>
                              <div className="font-semibold">{flight.live.altitude}m</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Wind size={16} className="text-blue-600" />
                            <div>
                              <div className="text-sm text-gray-600">Speed</div>
                              <div className="font-semibold">{flight.live.speed} km/h</div>
                            </div>
                          </div>
                        </div>

                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <div className="flex items-center gap-2 text-gray-600 mb-2">
                            <Clock size={16} />
                            <span>Duration: {flight.duration}</span>
                          </div>
                        </div>
                      </div>
                    </Popup>
                    <Circle center={livePosition} pathOptions={{ color: 'blue' }} radius={5000} />
                  </Marker>
                )}

                {livePosition && <FlightPath flight={flight} />}
              </React.Fragment>
            );
          })}
        </MapContainer>
      </div>
    </div>
  );
};

export default FlightsMap;