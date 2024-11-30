import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Button,
  Select,
  MenuItem,
  Box,
  CircularProgress,
  Paper,
  Pagination,
} from '@mui/material';

const FlightBoard = () => {
  const [arrivals, setArrivals] = useState([]);
  const [departures, setDepartures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Pagination state
  const [arrivalPage, setArrivalPage] = useState(1);
  const [departurePage, setDeparturePage] = useState(1);
  const pageSize = 10;

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
      year: 'numeric',
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

  const getPaginatedData = (data, page, sort) => {
    const sortedData = sortFlights(data, sort);
    const startIndex = (page - 1) * pageSize;
    return sortedData.slice(startIndex, startIndex + pageSize);
  };

  const paginatedArrivals = getPaginatedData(arrivals, arrivalPage, arrivalSort);
  const paginatedDepartures = getPaginatedData(departures, departurePage, departureSort);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  const renderFlightsTable = (flights, type) => (
    <TableContainer component={Paper} elevation={3}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Flight</TableCell>
            <TableCell>Airline</TableCell>
            <TableCell>{type === 'arrival' ? 'From' : 'To'}</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>{type === 'arrival' ? 'Scheduled Arrival' : 'Scheduled Departure'}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {flights.map((flight, index) => (
            <TableRow key={index}>
              <TableCell>{flight.flightNumber}</TableCell>
              <TableCell>{flight.airline}</TableCell>
              <TableCell>
                {type === 'arrival' ? flight.departure.iata : flight.arrival.iata}
              </TableCell>
              <TableCell>{flight.status}</TableCell>
              <TableCell>
                {type === 'arrival'
                  ? formatTimeToCentral(flight.arrival.scheduled)
                  : formatTimeToCentral(flight.departure.scheduled)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Flight Board - Dallas (DFW)
      </Typography>

      {/* Arrivals Section */}
      <Box sx={{ marginBottom: 4 }}>
        <Typography variant="h5">Arrivals</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
          <Typography>Sort by: </Typography>
          <Select
            value={arrivalSort}
            onChange={(e) => setArrivalSort(e.target.value)}
            sx={{ marginLeft: 2 }}
          >
            <MenuItem value="time">Most Recent</MenuItem>
            <MenuItem value="airline">Airline</MenuItem>
          </Select>
        </Box>
        {renderFlightsTable(paginatedArrivals, 'arrival')}
        <Pagination
          count={Math.ceil(arrivals.length / pageSize)}
          page={arrivalPage}
          onChange={(e, value) => setArrivalPage(value)}
          sx={{ marginTop: 2 }}
        />
      </Box>

      {/* Departures Section */}
      <Box>
        <Typography variant="h5">Departures</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
          <Typography>Sort by: </Typography>
          <Select
            value={departureSort}
            onChange={(e) => setDepartureSort(e.target.value)}
            sx={{ marginLeft: 2 }}
          >
            <MenuItem value="time">Most Recent</MenuItem>
            <MenuItem value="airline">Airline</MenuItem>
          </Select>
        </Box>
        {renderFlightsTable(paginatedDepartures, 'departure')}
        <Pagination
          count={Math.ceil(departures.length / pageSize)}
          page={departurePage}
          onChange={(e, value) => setDeparturePage(value)}
          sx={{ marginTop: 2 }}
        />
      </Box>
    </Box>
  );
};

export default FlightBoard;
