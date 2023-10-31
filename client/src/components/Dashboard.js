import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';

function Dashboard() {
  const [weatherData, setWeatherData] = useState({});

  useEffect(() => {
    const city = 'London'; // Replace with actual city

    axios.get(`http://localhost:5000/weather/${city}`)
      .then(response => {
        setWeatherData(response.data);
      })
      .catch(error => {
        console.error('There was an error retrieving the data!', error);
      });
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <p>For viewing user's results</p>
      <p>Weather data: {JSON.stringify(weatherData)}</p>
      </div>
  );
}

export default Dashboard;