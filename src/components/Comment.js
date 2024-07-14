import React from 'react';

function Comment({ comment }) {
  return (
    <div>
      <p>{comment.body}</p>
    </div>
  );
}

export default Comment;
