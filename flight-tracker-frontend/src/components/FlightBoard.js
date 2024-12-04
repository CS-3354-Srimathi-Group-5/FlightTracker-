import React, { useEffect, useState } from 'react';
import backgroundGif from '../assets/plane.gif';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Select,
  MenuItem,
  Box,
  CircularProgress,
  Paper,
  Pagination,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Tooltip
} from '@mui/material';

const FlightDetailsModal = ({ open, onClose, flight, type }) => {
  if (!flight) return null;

  const renderDetailRow = (label, value) => (
    <Grid container spacing={2} sx={{ marginBottom: 1 }}>
      <Grid item xs={4}>
        <Typography variant="subtitle2">{label}:</Typography>
      </Grid>
      <Grid item xs={8}>
        <Typography variant="body2">{value}</Typography>
      </Grid>
    </Grid>
  );

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        Flight Details - {flight.flightNumber} ({flight.airline})
      </DialogTitle>
      <DialogContent dividers>
        <Box sx={{ padding: 2 }}>
          {renderDetailRow('Flight Number', flight.flightNumber)}
          {renderDetailRow('Airline', flight.airline)}
          {renderDetailRow('Status', flight.status)}
          
          {type === 'arrival' ? (
            <>
              {renderDetailRow('Departure Airport', `${flight.departure.iata} - ${flight.departure.airport}`)}
              {renderDetailRow('Arrival Airport', `${flight.arrival.iata} - ${flight.arrival.airport}`)}
              {renderDetailRow('Scheduled Arrival', new Date(flight.arrival.scheduled).toLocaleString())}
              {flight.arrival.actual && renderDetailRow('Actual Arrival', new Date(flight.arrival.actual).toLocaleString())}
            </>
          ) : (
            <>
              {renderDetailRow('Departure Airport', `${flight.departure.iata} - ${flight.departure.airport}`)}
              {renderDetailRow('Arrival Airport', `${flight.arrival.iata} - ${flight.arrival.airport}`)}
              {renderDetailRow('Scheduled Departure', new Date(flight.departure.scheduled).toLocaleString())}
              {flight.departure.actual && renderDetailRow('Actual Departure', new Date(flight.departure.actual).toLocaleString())}
            </>
          )}

          {flight.aircraft && renderDetailRow('Aircraft', flight.aircraft.model)}
          {flight.operator && renderDetailRow('Operator', flight.operator)}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const FlightBoard = () => {
  const [arrivals, setArrivals] = useState([]);
  const [departures, setDepartures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Pagination state
  const [arrivalPage, setArrivalPage] = useState(1);
  const [departurePage, setDeparturePage] = useState(1);
  const pageSize = 10;
  
  // Search state
  const [arrivalSearchTerm, setArrivalSearchTerm] = useState('');
  const [departureSearchTerm, setDepartureSearchTerm] = useState('');
  const [arrivalSearchField, setArrivalSearchField] = useState('all');
  const [departureSearchField, setDepartureSearchField] = useState('all');
  
  // Details modal state
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [selectedFlightType, setSelectedFlightType] = useState(null);
  
  // Enhanced sorting preferences
  const [arrivalSortConfig, setArrivalSortConfig] = useState({
    key: 'time',
    direction: 'asc'
  });
  const [departureSortConfig, setDepartureSortConfig] = useState({
    key: 'time',
    direction: 'asc'
  });

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

  const sortFlights = (flights, sortConfig) => {
    const sortedFlights = [...flights];
    
    return sortedFlights.sort((a, b) => {
      let valueA, valueB;
      
      switch(sortConfig.key) {
        case 'time':
          valueA = new Date(a.scheduled || a.departure.scheduled || a.arrival.scheduled);
          valueB = new Date(b.scheduled || b.departure.scheduled || b.arrival.scheduled);
          break;
        case 'airline':
          valueA = a.airline;
          valueB = b.airline;
          break;
        case 'flightNumber':
          // Extract numeric part of flight number for proper numerical sorting
          valueA = parseInt(a.flightNumber.replace(/\D/g, ''));
          valueB = parseInt(b.flightNumber.replace(/\D/g, ''));
          break;
        default:
          return 0;
      }

      // Handle string comparisons
      if (typeof valueA === 'string' && typeof valueB === 'string') {
        return sortConfig.direction === 'asc'
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      }

      // Handle date and numeric comparisons
      return sortConfig.direction === 'asc'
        ? (valueA > valueB ? 1 : valueA < valueB ? -1 : 0)
        : (valueA < valueB ? 1 : valueA > valueB ? -1 : 0);
    });
  };

  const searchFlights = (flights, searchTerm, searchField) => {
    if (!searchTerm) return flights;

    const normalizedSearchTerm = searchTerm.toLowerCase().trim();

    return flights.filter(flight => {
      // Helper function to check if a value matches the search term
      const matchesSearchTerm = (value) => 
        value.toString().toLowerCase().includes(normalizedSearchTerm);

      // Search across different fields based on selected search field
      switch(searchField) {
        case 'flightNumber':
          return matchesSearchTerm(flight.flightNumber);
        case 'airline':
          return matchesSearchTerm(flight.airline);
        case 'location':
          return matchesSearchTerm(flight.departure?.iata || flight.arrival?.iata);
        case 'status':
          return matchesSearchTerm(flight.status);
        default: // 'all' case
          return (
            matchesSearchTerm(flight.flightNumber) ||
            matchesSearchTerm(flight.airline) ||
            matchesSearchTerm(flight.departure?.iata || flight.arrival?.iata) ||
            matchesSearchTerm(flight.status)
          );
      }
    });
  };

  const getPaginatedData = (data, page, sortConfig, searchTerm, searchField) => {
    // First search, then sort, then paginate
    const searchedData = searchFlights(data, searchTerm, searchField);
    const sortedData = sortFlights(searchedData, sortConfig);
    const startIndex = (page - 1) * pageSize;
    return sortedData.slice(startIndex, startIndex + pageSize);
  };

  const paginatedArrivals = getPaginatedData(
    arrivals, 
    arrivalPage, 
    arrivalSortConfig, 
    arrivalSearchTerm, 
    arrivalSearchField
  );
  const paginatedDepartures = getPaginatedData(
    departures, 
    departurePage, 
    departureSortConfig, 
    departureSearchTerm, 
    departureSearchField
  );

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  const renderSearchMenu = (type, searchTerm, setSearchTerm, searchField, setSearchField) => {
    const searchOptions = [
      { value: 'all', label: 'All Fields' },
      { value: 'flightNumber', label: 'Flight Number' },
      { value: 'airline', label: 'Airline' },
      { value: 'location', label: 'Location' },
      { value: 'status', label: 'Status' }
    ];

    return (
      <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
        <TextField
          label="Search Flights"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            // Reset to first page when searching
            type === 'arrival' ? setArrivalPage(1) : setDeparturePage(1);
          }}
          sx={{ marginRight: 2 }}
        />
        <Select
          value={searchField}
          onChange={(e) => setSearchField(e.target.value)}
          sx={{ width: 200 }}
        >
          {searchOptions.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </Box>
    );
  };

  const renderSortMenu = (type, sortConfig, setSortConfig) => {
    const sortOptions = [
      { key: 'time', label: 'Time' },
      { key: 'airline', label: 'Airline' },
      { key: 'flightNumber', label: 'Flight Number' }
    ];

    return (
      <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
        <Typography>Sort by: </Typography>
        <Select
          value={sortConfig.key}
          onChange={(e) => setSortConfig(prev => ({ ...prev, key: e.target.value }))}
          sx={{ marginLeft: 2, marginRight: 2 }}
        >
          {sortOptions.map(option => (
            <MenuItem key={option.key} value={option.key}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
        <Select
          value={sortConfig.direction}
          onChange={(e) => setSortConfig(prev => ({ ...prev, direction: e.target.value }))}
        >
          <MenuItem value="asc">{sortConfig.key === 'airline' ? 'A-Z' : 'Increasing'}</MenuItem>
          <MenuItem value="desc">{sortConfig.key === 'airline' ? 'Z-A' : 'Decreasing'}</MenuItem>
        </Select>
      </Box>
    );
  };

  const handleOpenFlightDetails = (flight, type) => {
    setSelectedFlight(flight);
    setSelectedFlightType(type);
  };

  const handleCloseFlightDetails = () => {
    setSelectedFlight(null);
    setSelectedFlightType(null);
  };

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
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {flights.map((flight, index) => {
            // Determine status color
            let statusColor = '';
            switch (flight.status.toLowerCase()) {
              case 'scheduled':
                statusColor = 'rgba(255, 255, 0, 0.3)'; // Light Yellow
                break;
              case 'delayed':
                statusColor = 'rgba(255, 0, 0, 0.3)'; // Light Red
                break;
              case 'cancelled':
                statusColor = 'rgba(255, 0, 0, 0.3)'; // Light Red
                break;
              case 'landed':
                statusColor = 'rgba(0, 255, 0, 0.3)'; // Light Green
                break;
              case 'active':
                statusColor = 'rgba(255, 200, 124)'; // Light Orange
                break;
              default:
                statusColor = 'rgba(211, 211, 211, 0.3)'; // Light Gray for unknown statuses
            }
  
            return (
              <TableRow key={index}>
                <TableCell>{flight.flightNumber}</TableCell>
                <TableCell>{flight.airline}</TableCell>
                <TableCell>
                  {type === 'arrival' ? flight.departure.iata : flight.arrival.iata}
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: statusColor,
                    borderRadius: '4px',
                    textAlign: 'center',
                  }}
                >
                  {flight.status}
                </TableCell>
                <TableCell>
                  {type === 'arrival'
                    ? formatTimeToCentral(flight.arrival.scheduled)
                    : formatTimeToCentral(flight.departure.scheduled)}
                </TableCell>
                <TableCell>
                  <Tooltip
                    title={
                      <Box>
                        <Typography variant="body2" fontWeight="bold">
                          {flight.airline} {flight.flightNumber}
                        </Typography>
                        <Typography variant="caption">
                          {type === 'arrival'
                            ? `From: ${flight.departure.airport} (${flight.departure.iata})`
                            : `To: ${flight.arrival.airport} (${flight.arrival.iata})`}
                        </Typography>
                        <Typography variant="caption">Status: {flight.status}</Typography>
                      </Box>
                    }
                    placement="right"
                    arrow
                  >
                    <Button
                      variant="outlined"
                      color="primary"
                      size="small"
                      onClick={() => handleOpenFlightDetails(flight, type)}
                    >
                      Details
                    </Button>
                  </Tooltip>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
  

  return (
    <Box sx={{
        position: 'relative',
        padding: 4,
        backgroundImage: `url(${backgroundGif})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          backgroundColor: 'rgba(255, 255, 255, 0.8)', // 80% opaque white overlay
          zIndex: 1,
        },
        '& > *': {
          position: 'relative',
          zIndex: 2, // Ensure content is above the overlay
        },
      }}
    >
      <Typography variant="h4" align="center" gutterBottom>
        Flight Board - Dallas (DFW)
      </Typography>
      
      <FlightDetailsModal 
        open={!!selectedFlight} 
        onClose={handleCloseFlightDetails}
        flight={selectedFlight}
        type={selectedFlightType}
      />
      
      {/* Arrivals Section */}
      <Box sx={{ marginBottom: 4 }}>
        <Typography variant="h5">Arrivals</Typography>
        {renderSearchMenu(
          'arrival', 
          arrivalSearchTerm, 
          setArrivalSearchTerm, 
          arrivalSearchField, 
          setArrivalSearchField
        )}
        {renderSortMenu('arrival', arrivalSortConfig, setArrivalSortConfig)}
        {renderFlightsTable(paginatedArrivals, 'arrival')}
        <Pagination
          count={Math.ceil(
            searchFlights(arrivals, arrivalSearchTerm, arrivalSearchField).length / pageSize
          )}
          page={arrivalPage}
          onChange={(e, value) => setArrivalPage(value)}
          sx={{ marginTop: 2 }}
        />
      </Box>

      {/* Departures Section */}
      <Box>
        <Typography variant="h5">Departures</Typography>
        {renderSearchMenu(
          'departure', 
          departureSearchTerm, 
          setDepartureSearchTerm, 
          departureSearchField, 
          setDepartureSearchField
        )}
        {renderSortMenu('departure', departureSortConfig, setDepartureSortConfig)}
        {renderFlightsTable(paginatedDepartures, 'departure')}
        <Pagination
          count={Math.ceil(
            searchFlights(departures, departureSearchTerm, departureSearchField).length / pageSize
          )}
          page={departurePage}
          onChange={(e, value) => setDeparturePage(value)}
          sx={{ marginTop: 2 }}
        />
      </Box>
    </Box>
  );
};

export default FlightBoard;