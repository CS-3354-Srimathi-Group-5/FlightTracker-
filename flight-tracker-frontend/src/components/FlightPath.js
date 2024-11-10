//Warren and Ashraful
//Use Case: View Flight Path on Map


import React, { useEffect, useState } from 'react';
import { Polyline } from 'react-leaflet';

// Comprehensive airport coordinates database
const AIRPORT_COORDINATES = {
    // United States Airports
    "DFW": [32.8968, -97.0380],  // Dallas/Fort Worth International
    "Los Angeles International": [33.9416, -118.4085],  // Los Angeles International
    "ORD": [41.9742, -87.9073],  // Chicago O'Hare International
    "ATL": [33.6407, -84.4277],  // Hartsfield-Jackson Atlanta International
    "JFK": [40.6413, -73.7781],  // John F. Kennedy International
    "DEN": [39.8561, -104.6737],  // Denver International
    "SFO": [37.6213, -122.3790],  // San Francisco International
    "CLT": [35.2144, -80.9473],  // Charlotte Douglas International
    "LAS": [36.0840, -115.1537],  // Las Vegas Harry Reid International
    "PHX": [33.4352, -112.0101],  // Phoenix Sky Harbor International
    "IAH": [29.9902, -95.3368],  // Houston George Bush Intercontinental
    "MIA": [25.7932, -80.2906],  // Miami International
    "MCO": [28.4312, -81.3081],  // Orlando International
    "SEA": [47.4502, -122.3088],  // Seattle-Tacoma International
    "EWR": [40.6895, -74.1745],  // Newark Liberty International
    "MSP": [44.8848, -93.2223],  // Minneapolis-Saint Paul International
    "DTW": [42.2162, -83.3554],  // Detroit Metropolitan Wayne County
    "BOS": [42.3656, -71.0096],  // Boston Logan International
    "PHL": [39.8729, -75.2437],  // Philadelphia International
    "LGA": [40.7769, -73.8740],  // LaGuardia Airport
    "FLL": [26.0742, -80.1506],  // Fort Lauderdale–Hollywood International
    "BWI": [39.1754, -76.6682],  // Baltimore/Washington International
    "IAD": [38.9531, -77.4565],  // Washington Dulles International
    "SLC": [40.7899, -111.9791],  // Salt Lake City International
    "SAN": [32.7338, -117.1933],  // San Diego International
    "HNL": [21.3245, -157.9251],  // Daniel K. Inouye International
    "PDX": [45.5898, -122.5951],  // Portland International
    "BNA": [36.1263, -86.6774],  // Nashville International
    "AUS": [30.1975, -97.6664],  // Austin-Bergstrom International
    
    // Major Canadian Airports
    "YYZ": [43.6777, -79.6248],  // Toronto Pearson International
    "YVR": [49.1967, -123.1815],  // Vancouver International
    "YUL": [45.4706, -73.7408],  // Montréal-Pierre Elliott Trudeau International
    "YYC": [51.1315, -114.0105],  // Calgary International
    
    // Major European Airports
    "Heathrow": [51.4700, -0.4543],  // London Heathrow Airport
    "CDG": [49.0097, 2.5479],  // Paris Charles de Gaulle Airport
    "AMS": [52.3105, 4.7683],  // Amsterdam Airport Schiphol
    "FRA": [50.0379, 8.5622],  // Frankfurt Airport
    "MAD": [40.4983, -3.5676],  // Madrid Barajas Airport
    "FCO": [41.8003, 12.2389],  // Rome Fiumicino Airport
    "MUC": [48.3537, 11.7750],  // Munich Airport
    "ZRH": [47.4647, 8.5492],  // Zurich Airport
    
    // Major Asian Airports
    "HND": [35.5494, 139.7798],  // Tokyo Haneda Airport
    "NRT": [35.7720, 140.3929],  // Tokyo Narita Airport
    "SIN": [1.3644, 103.9915],  // Singapore Changi Airport
    "HKG": [22.3080, 113.9185],  // Hong Kong International
    "ICN": [37.4602, 126.4407],  // Seoul Incheon International
    "PEK": [40.0799, 116.6031],  // Beijing Capital International
    "PVG": [31.1443, 121.8083],  // Shanghai Pudong International
    "Dubai": [25.2532, 55.3657],  // Dubai International
    
    // Major Australian/NZ Airports
    "SYD": [-33.9399, 151.1753],  // Sydney Kingsford Smith Airport
    "MEL": [-37.6690, 144.8410],  // Melbourne Airport
    "BNE": [-27.3842, 153.1175],  // Brisbane Airport
    "AKL": [-37.0082, 174.7850],  // Auckland Airport
    
    // Major South American Airports
    "GRU": [-23.4356, -46.4731],  // São Paulo/Guarulhos International
    "MEX": [19.4363, -99.0721],  // Mexico City International
    "BOG": [4.7016, -74.1469],  // El Dorado International
    "LIM": [-12.0219, -77.1143],  // Jorge Chávez International
    
    // Major African Airports
    "JNB": [-26.1367, 28.2425],  // O. R. Tambo International
    "CAI": [30.1219, 31.4056],  // Cairo International
    "CPT": [-33.9649, 18.6017],  // Cape Town International
    "NBO": [-1.3192, 36.9278]  // Jomo Kenyatta International
  };
  

const FlightPath = ({ flight }) => {
  const [pathPoints, setPathPoints] = useState([]);

  useEffect(() => {
    const updatePath = () => {
      // Check if we have live flight data
      if (!flight?.live?.latitude || !flight?.live?.longitude) {
        console.log('No live flight data available');
        setPathPoints([]);
        return;
      }

      // Get destination coordinates
      const destinationCoords = AIRPORT_COORDINATES[flight.arrival.airport];
      if (!destinationCoords) {
        console.log('Missing coordinates for airport:', flight.arrival.airport);
        setPathPoints([]);
        return;
      }

      // Set current position and destination
      const currentPosition = [flight.live.latitude, flight.live.longitude];
      console.log('Drawing path from', currentPosition, 'to', destinationCoords);
      setPathPoints([currentPosition, destinationCoords]);
    };

    // Initial update
    updatePath();

    // Update every minute
    const intervalId = setInterval(updatePath, 60000);
    return () => clearInterval(intervalId);
  }, [flight]);

  if (pathPoints.length < 2) {
    return null;
  }

  return (
    <>
      {/* Very thick base line for maximum visibility */}
      <Polyline
        positions={pathPoints}
        pathOptions={{
          color: '#FF0000',
          weight: 15,
          opacity: 0.3,
          lineCap: 'round',
          lineJoin: 'round',
        }}
      />
      {/* Main visible line */}
      <Polyline
        positions={pathPoints}
        pathOptions={{
          color: '#FF0000',
          weight: 8,
          opacity: 0.8,
          lineCap: 'round',
          lineJoin: 'round',
        }}
      />
    </>
  );
};

export default FlightPath;