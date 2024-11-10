import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FlightBoard = () => {
  const [arrivals, setArrivals] = useState([]);
  const [departures, setDepartures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Pagination state
  const [arrivalPage, setArrivalPage] = useState(1);
  const [departurePage, setDeparturePage] = useState(1);
  const pageSize = 10; // Number of flights per page

  // Sorting preferences
  const [arrivalSort, setArrivalSort] = useState('time');
  const [departureSort, setDepartureSort] = useState('time');

  const formatTimeToCentral = (utcTime) => {
    if (!utcTime) return 'Unknown';
    const date = new Date(utcTime);
    const centralTime = new Date(date.toLocaleString('en-US', { timeZone: 'America/Chicago' }));
    centralTime.setHours(centralTime.getHours() + 5);
    return centralTime.toLocaleString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
      month: 'numeric',
      day: 'numeric',
      year: 'numeric'
    });
  };

  useEffect(() => {
    const fetchFlightData = async () => {
      try {
        setLoading(true);
        const arrivalsResponse = await axios.get('http://localhost:5001/api/flights/arrivals');
        const departuresResponse = await axios.get('http://localhost:5001/api/flights/departures');
        setArrivals(arrivalsResponse.data);
        setDepartures(departuresResponse.data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching flight data');
        setLoading(false);
      }
    };
    fetchFlightData();
  }, []);

  const sortFlights = (flights, sortBy) => {
    const sortedFlights = [...flights];
    if (sortBy === 'time') {
      return sortedFlights.sort((a, b) => new Date(a.scheduled) - new Date(b.scheduled));
    } else if (sortBy === 'airline') {
      return sortedFlights.sort((a, b) => a.airline.localeCompare(b.airline));
    }
    return sortedFlights;
  };

  // Get paginated data for arrivals and departures
  const getPaginatedData = (data, page, sort) => {
    const sortedData = sortFlights(data, sort);
    const startIndex = (page - 1) * pageSize;
    return sortedData.slice(startIndex, startIndex + pageSize);
  };

  const paginatedArrivals = getPaginatedData(arrivals, arrivalPage, arrivalSort);
  const paginatedDepartures = getPaginatedData(departures, departurePage, departureSort);

  // Pagination controls
  const handleNextPage = (type) => {
    if (type === 'arrival' && arrivalPage * pageSize < arrivals.length) {
      setArrivalPage((prev) => prev + 1);
    } else if (type === 'departure' && departurePage * pageSize < departures.length) {
      setDeparturePage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = (type) => {
    if (type === 'arrival' && arrivalPage > 1) {
      setArrivalPage((prev) => prev - 1);
    } else if (type === 'departure' && departurePage > 1) {
      setDeparturePage((prev) => prev - 1);
    }
  };

  if (loading) return <div>Loading flight data...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Flight Board - Dallas (DFW)</h1>

      {/* Arrivals Section with Pagination */}
      <div>
        <h2>Arrivals</h2>
        <label>
          Sort by: 
          <select value={arrivalSort} onChange={(e) => setArrivalSort(e.target.value)}>
            <option value="time">Most Recent</option>
            <option value="airline">Airline</option>
          </select>
        </label>
        <table>
          <thead>
            <tr>
              <th>Flight</th>
              <th>Airline</th>
              <th>From</th>
              <th>Status</th>
              <th>Scheduled Arrival</th>
            </tr>
          </thead>
          <tbody>
            {paginatedArrivals.map((flight, index) => (
              <tr key={index}>
                <td>{flight.flightNumber}</td>
                <td>{flight.airline}</td>
                <td>{flight.departure.iata}</td>
                <td>{flight.status}</td>
                <td>{formatTimeToCentral(flight.arrival.scheduled)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={() => handlePreviousPage('arrival')} disabled={arrivalPage === 1}>
          Previous
        </button>
        <button onClick={() => handleNextPage('arrival')} disabled={arrivalPage * pageSize >= arrivals.length}>
          Next
        </button>
      </div>
      
      {/* Departures Section with Pagination */}
      <div>
        <h2>Departures</h2>
        <label>
          Sort by: 
          <select value={departureSort} onChange={(e) => setDepartureSort(e.target.value)}>
            <option value="time">Most Recent</option>
            <option value="airline">Airline</option>
          </select>
        </label>
        <table>
          <thead>
            <tr>
              <th>Flight</th>
              <th>Airline</th>
              <th>To</th>
              <th>Status</th>
              <th>Scheduled Departure</th>
            </tr>
          </thead>
          <tbody>
            {paginatedDepartures.map((flight, index) => (
              <tr key={index}>
                <td>{flight.flightNumber}</td>
                <td>{flight.airline}</td>
                <td>{flight.arrival.iata}</td>
                <td>{flight.status}</td>
                <td>{formatTimeToCentral(flight.departure.scheduled)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={() => handlePreviousPage('departure')} disabled={departurePage === 1}>
          Previous
        </button>
        <button onClick={() => handleNextPage('departure')} disabled={departurePage * pageSize >= departures.length}>
          Next
        </button>
      </div>
    </div>
  );
};

export default FlightBoard;
