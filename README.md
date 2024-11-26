# Weather Dashboard

## Overview
A full-stack Weather Dashboard application built with the MERN stack, allowing users to fetch current weather and 3-day forecast for any city.

## Technologies Used
- Frontend: React, Tailwind CSS
- Backend: Node.js, Express.js
- API: OpenWeatherMap

## Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/sid-rh/WeatherDashboard.git
cd weather-dashboard
```

### 2. Backend Setup
```bash
cd Backend
npm install
```

### 3. Frontend Setup
```bash
cd react-ui
npm install
```

### 4. Configuration
Create a `.env` file in the backend directory:
```
PORT=8000
OPENWEATHER_API_KEY=<your_openweathermap_api_key>
```

### 5. Running the Application
Terminal 1 (Backend):
```bash
cd Backend
nodemon app
```

Terminal 2 (Frontend):
```bash
cd react-ui
npm start
```

## Approach and Challenges

### Technical Approach
- Used MERN stack for full-stack development
- Implemented proxy server to handle API requests
- Added error handling for API failures
- Created responsive UI with Tailwind CSS

### Challenges
- Handling different weather data formats
- Creating a clean, intuitive user interface

## Future Improvements
- Add geolocation support
- Implement caching for repeated requests
- Create more detailed weather visualizations and graphs
- Add unit conversion (Celsius/Fahrenheit)