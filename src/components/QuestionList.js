// QuestionList.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function QuestionList() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/questions')
      .then(response => setQuestions(response.data))
      .catch(error => console.error('Error fetching questions:', error));
  }, []);

  return (
    <div>
      <h2>Liste des questions</h2>
      <ul>
        {questions.map(question => (
          <li key={question.id}>
            <Link to={`/questions/${question.id}`}>{question.title}</Link>
            <p>{question.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default QuestionList;
