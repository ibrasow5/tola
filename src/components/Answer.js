import React from 'react';

function Answer({ answer }) {
  return (
    <div className="answer-item">
      <p>{answer.body}</p>
    </div>
  );
}

export default Answer;
