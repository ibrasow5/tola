const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const cors = require('cors');
const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'tola'
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database');
});

// Signup route
app.post('/signup', async (req, res) => {
  const { email, password, themes } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const sqlInsertUser = 'INSERT INTO users (email, password) VALUES (?, ?)';
    db.query(sqlInsertUser, [email, hashedPassword], (err, result) => {
      if (err) {
        return res.status(500).json({ error: 'Error creating user' });
      }
      const userId = result.insertId;
      const themeQueries = themes.map(theme => 
        new Promise((resolve, reject) => {
          const sqlInsertTheme = 'INSERT INTO themes (user_id, theme) VALUES (?, ?)';
          db.query(sqlInsertTheme, [userId, theme], (err, result) => {
            if (err) reject(err);
            else resolve(result);
          });
        })
      );
      Promise.all(themeQueries)
        .then(() => res.status(201).json({ message: 'User created successfully' }))
        .catch(err => res.status(500).json({ error: 'Error saving themes' }));
    });
  } catch (err) {
    res.status(500).json({ error: 'Error hashing password' });
  }
});

// Login route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const sql = 'SELECT * FROM users WHERE email = ?';
  db.query(sql, [email], async (err, results) => {
    if (err) {
      console.error("Error fetching user:", err);
      res.status(500).send('Server error');
    } else if (results.length === 0) {
      res.status(401).send('Invalid email or password');
    } else {
      const user = results[0];
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        res.status(200).send('Login successful');
      } else {
        res.status(401).send('Invalid email or password');
      }
    }
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
