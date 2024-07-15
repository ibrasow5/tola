import React, { useState } from 'react';
import PostAnswer from './PostAnswer';
import Answer from './Answer';
import Vote from './Vote';
import '../css/Dashboard.css';

function Question({ question }) {
  const [showAnswers, setShowAnswers] = useState(false);
  const [showAnswerForm, setShowAnswerForm] = useState(false);

  const toggleAnswers = () => setShowAnswers(!showAnswers);
  const toggleAnswerForm = () => setShowAnswerForm(!showAnswerForm);

  return (
    <div className="question-item">
      <h3 onClick={toggleAnswers}>{question.title}</h3>
      {showAnswers && (
        <>
          <p>{question.body}</p>
          <Vote userId={1} type="question" id={question.id} />
          <button onClick={toggleAnswerForm}>
            {showAnswerForm ? 'Annuler' : 'Répondre'}
          </button>
          {showAnswerForm && <PostAnswer questionId={question.id} />}
          <div className="answers">
            {question.answers && question.answers.map(answer => (
              <Answer key={answer.id} answer={answer} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Question;
