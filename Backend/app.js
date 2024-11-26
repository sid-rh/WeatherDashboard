const express = require('express');
const axios = require('axios');
const cors = require('cors');
const dotenv=require('dotenv');
dotenv.config();

const app=express();
const PORT=process.env.PORT||8000;
const API_KEY=process.env.OPENWEATHER_API_KEY;

app.use(cors());
app.use(express.json());

const BASE_URL = 'https://api.openweathermap.org/data/2.5';

app.get('/api/weather', async (req, res) => {
    const { city } = req.query;
    
    if (!city) {
      return res.status(400).json({ error: 'City name is required' });
    }
  
    try {
      // Current weather
      const currentWeatherResponse = await axios.get(`${BASE_URL}/weather`, {
        params: {
          q: city,
          appid: API_KEY,
          units: 'metric'
        }
      });
  
      // 3-day forecast
      const forecastResponse = await axios.get(`${BASE_URL}/forecast`, {
        params: {
          q: city,
          appid: API_KEY,
          units: 'metric'
        }
      });
  
      // Process forecast data (group by day)
      const forecastData = forecastResponse.data.list
        .filter(entry => entry.dt_txt.includes('12:00:00'))
        .slice(0, 3)
        .map(entry => ({
          date: entry.dt_txt.split(' ')[0],
          temperature: entry.main.temp,
          description: entry.weather[0].description,
          icon: entry.weather[0].icon
        }));
  
      res.json({
        current: {
          temperature: currentWeatherResponse.data.main.temp,
          description: currentWeatherResponse.data.weather[0].description,
          icon: currentWeatherResponse.data.weather[0].icon,
          cityName: currentWeatherResponse.data.name,
          country: currentWeatherResponse.data.sys.country
        },
        forecast: forecastData
      });
    } catch (error) {
      console.error('Weather API error:', error.response?.data || error.message);
      res.status(error.response?.status || 500).json({ 
        error: 'Failed to fetch weather data',
        details: error.response?.data?.message || 'Unknown error'
      });
    }
  });

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

  
