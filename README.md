Flight Duration Calculation
This Node.js calculates and displays the flight duration based on flight number. It fetches real-time flight data from the AviationStack API and provides users with information on the departure and arrival cities, flight duration, and flight status.

Table of Contents
Project Structure
Prerequisites
Setup Instructions
Running the Application
API Usage
Error Handling
License
Project Structure
go
Copy code
/FlightDurationApp/
│
├── .env.local                  // Environment variables file (holds API key)
├── main.js                     // Main server file (Express setup and API route)
├── package.json                // Project metadata and dependencies
├── package-lock.json           // Lock file for dependencies
└── node_modules/               // Installed Node.js packages
Prerequisites
Before you begin, make sure you have the following installed on your system:

Node.js (version 14 or higher)
npm (Node Package Manager, comes with Node.js)
An API Key from AviationStack (required to access flight data)
Setup Instructions
Clone the Repository (if not already done):

bash
Copy code
git clone https://github.com/YourUsername/FlightDurationApp.git
cd FlightDurationApp
Install Dependencies:

bash
Copy code
npm install
Set Up Environment Variables:

Create a file named .env.local in the root directory (FlightDurationApp).
Add the following line to .env.local:
makefile
Copy code
AVIATION_STACK_API_KEY=your_actual_api_key_here
Replace your_actual_api_key_here with your actual AviationStack API key.
Run the Application:

bash
Copy code
node main.js
The backend server should now be running on http://localhost:5001.

Running the Application
Once the server is running, you can access the flight duration feature by making a GET request to the following endpoint:

URL: http://localhost:5001/flight-duration/:flightNumber
Method: GET
Parameter: flightNumber - The IATA code of the flight (e.g., AA100).
API Usage
Endpoint: /flight-duration/:flightNumber
Description: Retrieves the duration and other details of the specified flight.

Example:

bash
Copy code
GET http://localhost:5001/flight-duration/AA100
Response:

json
Copy code
{
  "departure_city": "New York John F. Kennedy International",
  "arrival_city": "Los Angeles International",
  "flight_duration": "Estimated flight duration (in-transit): 300 minutes"
}
Error Handling
The application handles common errors, including:

Flight not found: Returns a 404 status with a message if the flight number does not exist.
Flight cancelled: Returns a 500 status with an error message if the flight status is "cancelled."
Invalid departure/arrival time: Returns a 500 status if time data is missing or incorrect.
Arrival time before departure: Returns a 500 status if the arrival time is earlier than the departure time, indicating an error.
License
This project is licensed under the MIT License.
