const db = require('./dbConfig');
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

// Parse body of incoming POST requests
app.use(express.json());
app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.post('/register', (req, res) => {
  const { username, password, gender } = req.body;

  db.any('INSERT INTO users(username, password, gender) VALUES($1, $2, $3)', [username, password, gender])
    .then(() => {
      res.status(201).json({ status: 'success', message: 'User added' });
    })
    .catch((err) => {
      res.status(500).json({ status: 'error', message: err });
    });
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  db.any('SELECT * FROM users WHERE username = $1 AND password = $2', [username, password])
    .then((user) => {
      if (user.length > 0) {
        res.status(200).json({ status: 'success', user: user[0] });
      } else {
        res.status(401).json({ status: 'error', message: 'Invalid username or password' });
      }
    })
    .catch((err) => {
      res.status(500).json({ status: 'error', message: err });
    });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
});
