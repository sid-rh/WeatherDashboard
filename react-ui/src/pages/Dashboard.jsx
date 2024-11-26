import React, { useState } from 'react';
import axios from 'axios';


const Dashboard = () => {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
  
    const fetchWeatherData = async () => {
      if (!city) return;
  
      setLoading(true);
      setError(null);
  
      try {
        const response = await axios.get(`http://localhost:8000/api/weather?city=${city}`);
        setWeatherData(response.data);
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to fetch weather data');
      } finally {
        setLoading(false);
      }
    };
  
    const renderWeatherIcon = (iconCode) => (
      <img 
        src={`http://openweathermap.org/img/wn/${iconCode}@2x.png`} 
        alt="Weather Icon" 
        className="w-16 h-16"
      />
    );
  
    return (
      <div className="container mx-auto p-4 max-w-md">
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="p-4 bg-gray-100 border-b">
            <h1 className="text-xl font-bold text-gray-800">Weather Dashboard</h1>
          </div>
          <div className="p-4">
            <div className="flex space-x-2 mb-4">
              <input 
                type="text" 
                placeholder="Enter city name" 
                className="flex-grow border rounded p-2"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && fetchWeatherData()}
              />
              <button 
                onClick={fetchWeatherData} 
                disabled={loading}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
              >
                {loading ? 'Searching...' : 'Search'}
              </button>
            </div>
  
            {error && (
              <div className="text-red-500 mb-4 p-2 bg-red-100 rounded">
                {error}
              </div>
            )}
  
            {weatherData && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-bold">
                      {weatherData.current.cityName}, {weatherData.current.country}
                    </h2>
                    <p className="text-gray-600 capitalize">
                      {weatherData.current.description}
                    </p>
                  </div>
                  {renderWeatherIcon(weatherData.current.icon)}
                </div>
  
                <div className="text-3xl font-bold mb-4">
                  {Math.round(weatherData.current.temperature)}°C
                </div>
  
                <h3 className="text-xl font-semibold mb-2">3-Day Forecast</h3>
                <div className="grid grid-cols-3 gap-2">
                  {weatherData.forecast.map((day, index) => (
                    <div 
                      key={index} 
                      className="border rounded p-2 text-center bg-gray-50"
                    >
                      <p className="font-semibold">
                        {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}
                      </p>
                      <div className="flex justify-center">
                        {renderWeatherIcon(day.icon)}
                      </div>
                      <p className="font-bold">{Math.round(day.temperature)}°C</p>
                      <p className="text-xs text-gray-600 capitalize">{day.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
}

export default Dashboard