import React from 'react';
import PostAnswer from './PostAnswer';
import Answer from './Answer';
import '../css/Dashboard.css';

function Question({ question }) {
  return (
    <div className="question">
      <h2 className="question-title">{question.title}</h2>
      <p className="question-body">{question.body}</p>
      <PostAnswer questionId={question.id} />
      {question.answers && question.answers.map(answer => (
        <Answer key={answer.id} answer={answer} />
      ))}
    </div>
  );
}

export default Question;
