import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Logo from '../Tola5.png';

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
    <>
      <header className="home-header">
        <div className="logo-container">
          <img src={Logo} alt="Logo Tola" className="logo" width="100" height="auto" />
        </div>
      </header>
      <div className="dashboard-main">
        <div className="question-container">
          <h2 className="question-title">{question.title}</h2>
          <p className="question-body">{question.body}</p>
        </div>
        <div className="answers-section">
          <h3>Réponses :</h3>
        </div>
        <div className="answer-container"> 
            {question.answers.map(answer => (
              <p key={answer.id} className="answer-item">
                <p className="answer-body">{answer.body}</p>
              </p>
            ))}
        </div>
      </div>
    </>
  );
}

export default QuestionDetail;