import React from 'react';
import PostComment from './PostComment';
import Comment from './Comment';
import Vote from './Vote';

function Answer({ answer }) {
  return (
    <div>
      <p>{answer.body}</p>
      <Vote answerId={answer.id} />
      <PostComment answerId={answer.id} />
      {answer.comments && answer.comments.map(comment => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </div>
  );
}

export default Answer;
