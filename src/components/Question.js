import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PostAnswer from './PostAnswer';
import Vote from './Vote';
import '../css/Dashboard.css';

function Question({ question }) {
  const navigate = useNavigate();
  const [showAnswerForm, setShowAnswerForm] = useState(false);

  const handleTitleClick = () => {
    navigate(`/questions/${question.id}`);
  };

  const toggleAnswerForm = () => setShowAnswerForm(!showAnswerForm);

  return (
    <div className="question-item">
      <h3 onClick={handleTitleClick}>{question.title}</h3>
      <p>{question.body}</p>
      <div className="question-actions">
        <button onClick={toggleAnswerForm}>
          {showAnswerForm ? 'Annuler' : 'Répondre'}
        </button>
        <Vote userId={2} type="question" id={question.id} />
      </div>
      {showAnswerForm && <PostAnswer questionId={question.id} />}
    </div>
  );
}

export default Question;