# Flight Tracker Application

This is a full-stack Flight Tracker application built with a Node.js backend and a React frontend. The application allows users to search for flights by flight number and get detailed flight information like departure city, arrival city, time departed, and current flight status.

## Table of Contents

- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [Running the Application](#running-the-application)
- [API Usage](#api-usage)
- [Contributing](#contributing)
- [License](#license)

## Project Structure

```
/project-root/
│
├── flight-tracker/              // Backend directory (Node.js)
│   ├── index.js
│   ├── package.json
│   ├── package-lock.json
│   ├── .env.local
│   ├── .gitignore
│   └── node_modules/
│
└── flight-tracker-frontend/     // Frontend directory (React)
    ├── public/
    │   ├── index.html
    │   └── favicon.ico
    │
    ├── src/
    │   ├── components/
    │   │   └── FlightSearch.js
    |   |   └── FlightsMap.js
    │   ├── App.js
    │   ├── index.js
    │   └── styles/
    │       └── App.css
    │
    ├── package.json
    ├── package-lock.json
    └── node_modules/
```

## Prerequisites

Before you begin, make sure you have the following installed on your system:

- **Node.js** (version 14 or higher)
- **npm** (Node Package Manager, comes with Node.js)
- An API Key from [AviationStack](https://aviationstack.com/) (needed to fetch flight data)

## Backend Setup

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/CS-3354-Srimathi-Group-5/FlightTracker-.git
   cd flight-tracker/flight-tracker
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**:
   - Create a file named `.env.local` in the `flight-tracker` directory.
   - Add the following content to `.env.local`:
     
     ```
     AVIATION_STACK_API_KEY=your_actual_api_key_here
     ```

   - Replace `your_actual_api_key_here` with your actual AviationStack API key.

4. **Run the Backend**:
   ```bash
   node index.js
   ```

   The backend server should now be running on `http://localhost:5001`.

## Frontend Setup

1. **Navigate to the Frontend Directory**:
   ```bash
   cd ../flight-tracker-frontend
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Run the Frontend**:
   ```bash
   npm start
   ```

   The React app should automatically open in your default browser at `http://localhost:3000`.

## Running the Application

- Ensure that both the backend and frontend servers are running:
  - **Backend**: `http://localhost:5001`
  - **Frontend**: `http://localhost:3000`
- Use the search input on the React frontend to enter a flight number and press "Search" to get flight details.

## API Usage

### Backend API Endpoints

- **GET `/flight/:flightNumber`**
  - **Description**: Retrieves flight information for the given flight number.
  - **Parameters**: 
    - `flightNumber` (required): The IATA code of the flight.
  - **Example**:
    
    ```
    GET http://localhost:5001/flight/AA100
    ```

  - **Response**:

    ```json
    {
      "departure_city": "New York John F. Kennedy International",
      "arrival_city": "Los Angeles International",
      "time_departed": "2024-10-23T14:30:00Z",
      "time_landed": "N/A",
      "is_in_air": true
    }
    ```

## Contributing

If you’d like to contribute to this project:

1. Create a new branch (`git checkout -b feature/your-feature-name`).
3. Commit your changes (`git commit -am 'Add some feature'`).
4. Push to the branch (`git push origin feature/your-feature-name`).
5. Create a new Pull Request.

## License

This project is licensed under the MIT License.

---
