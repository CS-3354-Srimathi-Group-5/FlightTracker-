// src/flightSorting.js 
// MANISH NADENDLA
//SORTING FUNCTIONALITY

// Sort flights by departure time
export const sortFlightsByDepartureTime = (flights) => {
  return flights.sort((a, b) => new Date(a.time_departed) - new Date(b.time_departed));
};

// Sort flights by arrival time
export const sortFlightsByArrivalTime = (flights) => {
  return flights.sort((a, b) => new Date(a.time_arrived) - new Date(b.time_arrived));
};

// Sort flights by airline name
export const sortFlightsByAirlineName = (flights) => {
  return flights.sort((a, b) => a.airline_name.localeCompare(b.airline_name));
};

// Sort flights by status (On Time, Delayed, Cancelled)
export const sortFlightsByStatus = (flights) => {
  const statusOrder = {
    'On Time': 1,
    'Delayed': 2,
    'Cancelled': 3
  };
  
  return flights.sort((a, b) => (statusOrder[a.status] || 4) - (statusOrder[b.status] || 4));
};

// Sort flights by flight number (alphanumeric sorting)
export const sortFlightsByFlightNumber = (flights) => {
  return flights.sort((a, b) => a.flight_number.localeCompare(b.flight_number, undefined, { numeric: true }));
};
