const db = require('./dbConfig');
const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 5000;

// OpenWeatherMap API
const OPEN_WEATHER_MAP_API_KEY = '8c395d2b7bfeb6ab230779e70a3f6850';

// Google Custom Search API
const GOOGLE_CUSTOM_SEARCH_API_KEY = 'AIzaSyB1g6ZqJZo8b_NbFs-CWGfRlpazj6SwlkM';
const GOOGLE_CUSTOM_SEARCH_ENGINE_ID = 'f59a6b8ea1e0f44c3';

// Parse body of incoming POST requests
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.post('/register', (req, res) => {
  const { username, password, gender } = req.body;

  db.any('INSERT INTO users(username, password, gender) VALUES($1, $2, $3) RETURNING *', [username, password, gender])
    .then(user => {
      res.status(201).json(user[0]);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  db.any('SELECT * FROM users WHERE username = $1 AND password = $2', [username, password])
    .then((user) => {
      if (user.length > 0) {
        res.status(200).json(user[0]);
      } else {
        res.status(401).json({ error: 'Invalid username or password' });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

app.get('/weather/:city', (req, res) => {
  const city = req.params.city;

  axios
    .get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${OPEN_WEATHER_MAP_API_KEY}`)
    .then(response => {
      const weatherData = response.data;
      res.json(weatherData);
    })
    .catch(error => {
      res.status(500).json({ error: error.message });
    });
});

app.get('/outfit/:weather/:gender', (req, res) => {
  const { weather, gender } = req.params;

  axios
    .get(`https://www.googleapis.com/customsearch/v1`, {
      params: {
        key: GOOGLE_CUSTOM_SEARCH_API_KEY,
        cx: GOOGLE_CUSTOM_SEARCH_ENGINE_ID,
        q: `${gender} outfit for ${weather} weather`,
        searchType: 'image',
        num: 5
      }
    })
    .then(response => {
      const outfitImages = response.data.items.map(item => item.link);
      res.json(outfitImages);
    })
    .catch(error => {
      res.status(500).json({ error: error.message });
    });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
});