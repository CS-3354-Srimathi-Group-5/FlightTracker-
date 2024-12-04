
import React, { useEffect, useState } from 'react';
import { Polyline } from 'react-leaflet';

// Comprehensive airport coordinates database
const AIRPORT_COORDINATES = {
  "Dallas/Fort Worth International": [32.8968, -97.0380],
  "Los Angeles International": [33.9416, -118.4085],
  "Chicago O'hare International": [41.9742, -87.9073],
  "Hartsfield-Jackson Atlanta International": [33.6407, -84.4277],
  "John F. Kennedy International": [40.6413, -73.7781],
  "Denver International": [39.8561, -104.6737],
  "San Francisco International": [37.6213, -122.3790],
  "Charlotte Douglas International": [35.2144, -80.9473],
  "Las Vegas Harry Reid International": [36.0840, -115.1537],
  "Phoenix Sky Harbor International": [33.4352, -112.0101],
  "Houston George Bush Intercontinental": [29.9902, -95.3368],
  "Miami International": [25.7932, -80.2906],
  "Orlando International": [28.4312, -81.3081],
  "Seattle-Tacoma International": [47.4502, -122.3088],
  "Newark Liberty International": [40.6895, -74.1745],
  "Minneapolis-Saint Paul International": [44.8848, -93.2223],
  "Detroit Metropolitan Wayne County": [42.2162, -83.3554],
  "Boston Logan International": [42.3656, -71.0096],
  "Philadelphia International": [39.8729, -75.2437],
  "LaGuardia Airport": [40.7769, -73.8740],
  "Fort Lauderdale–Hollywood International": [26.0742, -80.1506],
  "Baltimore/Washington International": [39.1754, -76.6682],
  "Washington Dulles International": [38.9531, -77.4565],
  "Salt Lake City International": [40.7899, -111.9791],
  "San Diego International": [32.7338, -117.1933],
  "Daniel K. Inouye International": [21.3245, -157.9251],
  "Portland International": [45.5898, -122.5951],
  "Nashville International": [36.1263, -86.6774],
  "Austin-Bergstrom International": [30.1975, -97.6664],
  
  // Major Canadian Airports
  "Toronto Pearson International": [43.6777, -79.6248],
  "Vancouver International": [49.1967, -123.1815],
  "Montréal-Pierre Elliott Trudeau International": [45.4706, -73.7408],
  "Calgary International": [51.1315, -114.0105],
  
  // Major European Airports
  "Heathrow": [51.4700, -0.4543],
  "Paris Charles de Gaulle Airport": [49.0097, 2.5479],
  "Amsterdam Airport Schiphol": [52.3105, 4.7683],
  "Frankfurt Airport": [50.0379, 8.5622],
  "Madrid Barajas Airport": [40.4983, -3.5676],
  "Rome Fiumicino Airport": [41.8003, 12.2389],
  "Munich Airport": [48.3537, 11.7750],
  "Zurich Airport": [47.4647, 8.5492],
  
  // Major Asian Airports
  "Tokyo Haneda Airport": [35.5494, 139.7798],
  "Tokyo Narita Airport": [35.7720, 140.3929],
  "Singapore Changi Airport": [1.3644, 103.9915],
  "Hong Kong International": [22.3080, 113.9185],
  "Seoul Incheon International": [37.4602, 126.4407],
  "Beijing Capital International": [40.0799, 116.6031],
  "Shanghai Pudong International": [31.1443, 121.8083],
  "Dubai": [25.2532, 55.3657],
  
  // Major Australian/NZ Airports
  "Sydney Kingsford Smith Airport": [-33.9399, 151.1753],
  "Melbourne Airport": [-37.6690, 144.8410],
  "Brisbane International": [-27.3842, 153.1175],
  "Auckland Airport": [-37.0082, 174.7850],
  
  // Major South American Airports
  "São Paulo/Guarulhos International": [-23.4356, -46.4731],
  "Mexico City International": [19.4363, -99.0721],
  "El Dorado International": [4.7016, -74.1469],
  "Jorge Chávez International": [-12.0219, -77.1143],
  
  // Major African Airports
  "O. R. Tambo International": [-26.1367, 28.2425],
  "Cairo International": [30.1219, 31.4056],
  "Cape Town International": [-33.9649, 18.6017],
  "Jomo Kenyatta International": [-1.3192, 36.9278]
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