import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function QuestionDetail() {
  const { id } = useParams();
  const [question, setQuestion] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/questions/${id}`)
      .then(response => setQuestion(response.data))
      .catch(error => console.error('Erreur lors de la récupération de la question:', error));
  }, [id]);

  if (!question) {
    return <div>Chargement en cours...</div>;
  }

  return (
    <div>
      <h2>{question.title}</h2>
      <p>{question.body}</p>
      <h3>Réponses :</h3>
      <ul>
        {question.answers.map(answer => (
          <li key={answer.id}>
            <p>{answer.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default QuestionDetail;
