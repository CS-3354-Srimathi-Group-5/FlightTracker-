import React, { useEffect, useState } from 'react';
import { Polyline, Circle } from 'react-leaflet';

// Comprehensive US airport coordinates database (with select Mexican airports)
const AIRPORT_COORDINATES = {
  "Dallas/Fort Worth International": [32.8968, -97.0380],
   "Los Angeles International": [33.9416, -118.4085],
   "Chicago O'hare International": [41.9742, -87.9073],
   "Hartsfield Jackson Atlanta International": [33.6407, -84.4277],
   "John F Kennedy International": [40.6413, -73.7781],
   "Denver International": [39.8561, -104.6737],
   "San Francisco International": [37.6213, -122.3790],
   "Charlotte Douglas International": [35.2144, -80.9473],
   "Harry Reid International": [36.0840, -115.1537],
   "Phoenix Sky Harbor International": [33.4352, -112.0101],
   "George Bush Intercontinental": [29.9902, -95.3368],
   "Miami International": [25.7932, -80.2906],
   "Orlando International": [28.4312, -81.3081],
   "Seattle Tacoma International": [47.4502, -122.3088],
   "Newark Liberty International": [40.6895, -74.1745],
   "Minneapolis St Paul International": [44.8848, -93.2223],
   "Detroit Metropolitan Wayne County": [42.2162, -83.3554],
   "Logan International": [42.3656, -71.0096],
   "Philadelphia International": [39.8729, -75.2437],
   "LaGuardia": [40.7769, -73.8740],
   "Fort Lauderdale Hollywood International": [26.0742, -80.1506],
   "Baltimore Washington International": [39.1754, -76.6682],
   "Washington Dulles International": [38.9531, -77.4565],
   "Salt Lake City International": [40.7899, -111.9791],
   "San Diego International": [32.7338, -117.1933],
   "Daniel K Inouye International": [21.3245, -157.9251],
   "Portland International": [45.5898, -122.5951],
   "Nashville International": [36.1263, -86.6774],
   "Austin Bergstrom International": [30.1975, -97.6664],
   
   // Additional US Airports
   "Albany International": [42.7483, -73.8017],
   "Bradley International": [41.9389, -72.6832],
   "Buffalo Niagara International": [42.9405, -78.7322],
   "Burlington International": [44.4720, -73.1533],
   "Manchester Boston Regional": [42.9326, -71.4357],
   "Portland International Jetport": [43.6456, -70.3087],
   "Theodore Francis Green State": [41.7242, -71.4282],
   "Frederick Douglass Greater Rochester International": [43.1189, -77.6724],
   "Syracuse Hancock International": [43.1112, -76.1063],
   "Birmingham Shuttlesworth International": [33.5629, -86.7535],
   "Charleston International": [32.8986, -80.0405],
   "Columbia Metropolitan": [33.9388, -81.1195],
   "Greenville Spartanburg International": [34.8957, -82.2189],
   "Jacksonville International": [30.4941, -81.6879],
   "Muhammad Ali International": [38.1744, -85.7361],
   "Memphis International": [35.0424, -89.9767],
   "Norfolk International": [36.8946, -76.2012],
   "Richmond International": [37.5052, -77.3197],
   "Savannah Hilton Head International": [32.1276, -81.2020],
   "Cincinnati Northern Kentucky International": [39.0489, -84.6678],
   "Cleveland Hopkins International": [41.4117, -81.8497],
   "Des Moines International": [41.5340, -93.6631],
   "Gerald R Ford International": [42.8808, -85.5228],
   "Indianapolis International": [39.7173, -86.2944],
   "Kansas City International": [39.2976, -94.7139],
   "Milwaukee Mitchell International": [42.9472, -87.8966],
   "Eppley Airfield": [41.3032, -95.8940],
   "Albuquerque International Sunport": [35.0402, -106.6091],
   "Bill And Hillary Clinton National": [34.7294, -92.2243],
   "El Paso International": [31.8069, -106.3778],
   "Louis Armstrong New Orleans International": [29.9934, -90.2581],
   "Will Rogers World": [35.3931, -97.6007],
   "San Antonio International": [29.5337, -98.4698],
   "Tulsa International": [36.1984, -95.8881],
   "Boise Air Terminal": [43.5644, -116.2228],
   "Fresno Yosemite International": [36.7762, -119.7181],
   "Idaho Falls Regional": [43.5146, -112.0708],
   "Metropolitan Oakland International": [37.7214, -122.2208],
   "Ontario International": [34.0556, -117.6011],
   "Palm Springs International": [33.8303, -116.5067],
   "Reno Tahoe International": [39.4991, -119.7688],
   "Sacramento International": [38.6955, -121.5908],
   "Norman Y Mineta San Jose International": [37.3639, -121.9289],
   "Santa Barbara Municipal": [34.4262, -119.8415],
   "Spokane International": [47.6199, -117.5334],
   
   // Alaska & Hawaii
   "Ted Stevens Anchorage International": [61.1743, -149.9962],
   "Fairbanks International": [64.8151, -147.8560],
   "Juneau International": [58.3547, -134.5762],
   "Kahului": [20.8986, -156.4305],
   "Ellison Onizuka Kona International At Keahole": [19.7388, -156.0456],
   "Lihue": [21.9760, -159.3390],
   
   // Mexican Airports
   "Cancun International": [21.0365, -86.8771],
   "Don Miguel Hidalgo Y Costilla International": [20.5218, -103.3111], // Guadalajara
   "Los Cabos International": [23.1518, -109.7215],
   "General Mariano Escobedo International": [25.7785, -100.1067], // Monterrey
   "Licenciado Gustavo Diaz Ordaz International": [20.6801, -105.2544], // Puerto Vallarta
   "General Abelardo L Rodriguez International": [32.5411, -116.9706] // Tijuana
};

const FlightPath = ({ flight }) => {
  const [pathPoints, setPathPoints] = useState([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updatePath = () => {
      if (!flight?.live?.latitude || !flight?.live?.longitude) {
        console.log('No live flight data available');
        setPathPoints([]);
        return;
      }

      const destinationCoords = AIRPORT_COORDINATES[flight.arrival.airport];
      if (!destinationCoords) {
        console.log('Missing coordinates for airport:', flight.arrival.airport);
        setPathPoints([]);
        return;
      }

      const currentPosition = [flight.live.latitude, flight.live.longitude];
      setPathPoints([currentPosition, destinationCoords]);
    };


    updatePath();
    
    // Animate progress along the path
    let animationFrame = 0;
    const animate = () => {
      setProgress(prev => (prev + 0.005) % 1);
      animationFrame = requestAnimationFrame(animate);
    };
    animate();

    const intervalId = setInterval(updatePath, 60000);
    
    return () => {
      clearInterval(intervalId);
      cancelAnimationFrame(animationFrame);
    };
  }, [flight]);

  if (pathPoints.length < 2) {
    return null;
  }

  // Calculate intermediate points for the gradient effect
  const gradientPoints = Array.from({ length: 5 }, (_, i) => {
    const t = i / 4;
    return [
      pathPoints[0][0] + (pathPoints[1][0] - pathPoints[0][0]) * t,
      pathPoints[0][1] + (pathPoints[1][1] - pathPoints[0][1]) * t
    ];
  });

  return (
    <>
      {/* Background glow effect */}
      <Polyline
        positions={pathPoints}
        pathOptions={{
          color: '#FF6B6B',
          weight: 12,
          opacity: 0.2,
          lineCap: 'round',
          lineJoin: 'round',
        }}
      />
      
      {/* Gradient segments */}
      {gradientPoints.slice(0, -1).map((_, index) => (
        <Polyline
          key={index}
          positions={[gradientPoints[index], gradientPoints[index + 1]]}
          pathOptions={{
            color: `hsl(${354 + index * 15}, 100%, ${65 + index * 5}%)`,
            weight: 6,
            opacity: 0.8,
            lineCap: 'round',
            lineJoin: 'round',
          }}
        />
      ))}

      {/* Animated position indicator */}
      <Circle
        center={[
          pathPoints[0][0] + (pathPoints[1][0] - pathPoints[0][0]) * progress,
          pathPoints[0][1] + (pathPoints[1][1] - pathPoints[0][1]) * progress
        ]}
        pathOptions={{
          color: '#FF4136',
          fillColor: '#FF4136',
          fillOpacity: 1,
        }}
        radius={2000}
      >
      </Circle>
    </>
  );
};

export default FlightPath;