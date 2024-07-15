import React from 'react';
import PostComment from './PostComment';
import Comment from './Comment';
import Vote from './Vote';
import '../css/Dashboard.css';

function Answer({ answer }) {
  return (
    <div className="answer-container">
      <p>{answer.body}</p>
      <div className="comments-list">
        {answer.comments && answer.comments.map(comment => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </div>
      <PostComment answerId={answer.id} />
    </div>
  );
}

export default Answer;