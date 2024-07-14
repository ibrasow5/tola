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

// Post a question
app.post('/questions', (req, res) => {
  const { userId, title, body } = req.body;
  const sql = 'INSERT INTO questions (user_id, title, body) VALUES (?, ?, ?)';
  db.query(sql, [userId, title, body], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Error posting question' });
    }
    res.status(201).json({ message: 'Question posted successfully' });
  });
});

// Post an answer
app.post('/answers', (req, res) => {
  const { userId, questionId, body } = req.body;
  const sql = 'INSERT INTO answers (user_id, question_id, body) VALUES (?, ?, ?)';
  db.query(sql, [userId, questionId, body], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Error posting answer' });
    }
    res.status(201).json({ message: 'Answer posted successfully' });
  });
});

// Post a comment
app.post('/comments', (req, res) => {
  const { userId, answerId, body } = req.body;
  const sql = 'INSERT INTO comments (user_id, answer_id, body) VALUES (?, ?, ?)';
  db.query(sql, [userId, answerId, body], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Error posting comment' });
    }
    res.status(201).json({ message: 'Comment posted successfully' });
  });
});

// Vote on a question or answer
app.post('/votes', (req, res) => {
  const { userId, type, id, voteType } = req.body;
  const sql = `INSERT INTO votes (user_id, ${type}_id, vote_type) VALUES (?, ?, ?)`;
  db.query(sql, [userId, id, voteType], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Error voting' });
    }
    res.status(201).json({ message: 'Vote recorded successfully' });
  });
});

// Get questions with answers and comments
app.get('/questions', (req, res) => {
  const sql = `
    SELECT q.id, q.title, q.body, u.email AS user_email,
           a.id AS answer_id, a.body AS answer_body, a.user_id AS answer_user_id,
           c.id AS comment_id, c.body AS comment_body, c.user_id AS comment_user_id
    FROM questions q
    LEFT JOIN users u ON q.user_id = u.id
    LEFT JOIN answers a ON q.id = a.question_id
    LEFT JOIN comments c ON a.id = c.answer_id
    ORDER BY q.id DESC, a.id ASC, c.id ASC;
  `;
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching questions:", err);
      res.status(500).send('Server error');
    } else {
      res.status(200).json(results);
    }
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});