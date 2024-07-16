const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const cors = require('cors');
const app = express();
const port = 5000;

// Middleware
app.use(cors({
  origin: 'http://localhost:3000' // Assurez-vous que cette origine correspond à celle de votre frontend
}));
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

// Route pour récupérer une question par son ID
app.get('/questions/:id', (req, res) => {
  const questionId = req.params.id;

  // Requête SQL pour récupérer la question par son ID
  const sql = `
    SELECT q.id AS question_id, q.title AS question_title, q.body AS question_body,
           a.id AS answer_id, a.body AS answer_body
    FROM questions q
    LEFT JOIN answers a ON q.id = a.question_id
    WHERE q.id = ?
  `;

  db.query(sql, [questionId], (err, results) => {
    if (err) {
      console.error("Erreur lors de la récupération de la question:", err);
      return res.status(500).json({ error: 'Erreur serveur' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'Question non trouvée' });
    }

    // Traiter les résultats SQL pour structurer la réponse
    const question = {
      id: results[0].question_id,
      title: results[0].question_title,
      body: results[0].question_body,
      answers: results.filter(row => row.answer_id !== null).map(row => ({
        id: row.answer_id,
        body: row.answer_body
      }))
    };

    // Répondre avec la question et ses réponses
    res.status(200).json(question);
  });
});

// Post a question
app.post('/questions', (req, res) => {
  console.log('Données reçues :', req.body);
  const { title, body, userId } = req.body;
   // Vérifiez que tous les champs nécessaires sont fournis
   if (!title || !body || !userId) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  const sql = 'INSERT INTO questions (title, body, user_id) VALUES (?, ?, ?)';
  db.query(sql, [title, body, userId], (err, result) => {
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

// POST endpoint for handling votes
app.post('/votes', (req, res) => {
  const { userId, type, id, voteType } = req.body;
  const checkVoteSql = 'SELECT * FROM votes WHERE user_id = ? AND type = ? AND item_id = ?';
  const insertVoteSql = 'INSERT INTO votes (user_id, type, item_id, vote_type) VALUES (?, ?, ?, ?)';
  const deleteVoteSql = 'DELETE FROM votes WHERE user_id = ? AND type = ? AND item_id = ?';

  db.query(checkVoteSql, [userId, type, id], (err, results) => {
    if (err) {
      console.error('Error checking vote:', err);
      return res.status(500).json({ error: 'Server error' });
    }

    if (results.length > 0) {
      // User has already voted
      if (results[0].vote_type === voteType) {
        // Same vote type, remove the vote
        db.query(deleteVoteSql, [userId, type, id], (err, result) => {
          if (err) {
            console.error('Error deleting vote:', err);
            return res.status(500).json({ error: 'Server error' });
          }
          res.status(200).json({ message: 'Vote removed successfully' });
        });
      } else {
        // Different vote type, update the vote
        db.query(updateVoteSql, [voteType, userId, type, id], (err, result) => {
          if (err) {
            console.error('Error updating vote:', err);
            return res.status(500).json({ error: 'Server error' });
          }
          res.status(200).json({ message: 'Vote updated successfully' });
        });
      }
    } else {
      // User hasn't voted yet, insert a new vote
      db.query(insertVoteSql, [userId, type, id, voteType], (err, result) => {
        if (err) {
          console.error('Error inserting vote:', err);
          return res.status(500).json({ error: 'Server error' });
        }
        res.status(201).json({ message: 'Vote recorded successfully' });
      });
    }
  });
});


// Get questions with answers 
app.get('/questions', (req, res) => {
  const sql = `
    SELECT q.id AS question_id, q.title AS question_title, q.body AS question_body, u.email AS user_email,
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
      return;
    }

    // Structure des questions avec leurs réponses et commentaires
    const questionsMap = new Map();

    results.forEach(row => {
      const {
        question_id, question_title, question_body, user_email,
        answer_id, answer_body, answer_user_id,
        comment_id, comment_body, comment_user_id
      } = row;

      if (!questionsMap.has(question_id)) {
        questionsMap.set(question_id, {
          id: question_id,
          title: question_title,
          body: question_body,
          user_email: user_email,
          answers: []
        });
      }

      const question = questionsMap.get(question_id);

      if (answer_id) {
        let answer = question.answers.find(ans => ans.id === answer_id);
        if (!answer) {
          answer = {
            id: answer_id,
            body: answer_body,
            user_id: answer_user_id,
            comments: []
          };
          question.answers.push(answer);
        }

        if (comment_id) {
          answer.comments.push({
            id: comment_id,
            body: comment_body,
            user_id: comment_user_id
          });
        }
      }
    });

    // Convertir la Map en tableau
    const questions = Array.from(questionsMap.values());

    res.status(200).json(questions);
  });
});

app.get('/questions', (req, res) => {
  const getQuestionsSql = `
    SELECT q.*, 
    (SELECT COUNT(*) FROM votes v WHERE v.item_id = q.id AND v.type = 'question' AND v.vote_type = 'upvote') AS upvotes,
    (SELECT COUNT(*) FROM votes v WHERE v.item_id = q.id AND v.type = 'question' AND v.vote_type = 'downvote') AS downvotes
    FROM questions q
    ORDER BY upvotes DESC, downvotes ASC
  `;

  db.query(getQuestionsSql, (err, results) => {
    if (err) {
      console.error('Error fetching questions:', err);
      return res.status(500).json({ error: 'Server error' });
    }
    res.status(200).json(results);
  });
});



app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});