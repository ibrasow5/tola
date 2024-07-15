import React from 'react';
import '../css/Dashboard.css';
import axios from 'axios';

function Vote({ userId, type, id }) {
  const handleVote = (voteType) => {
    axios.post('http://localhost:5000/votes', { userId, type, id, voteType })
      .then(response => {
        console.log('Vote recorded successfully');
      })
      .catch(error => console.error('Error recording vote:', error));
  };

  return (
    <div className="vote-container">
      <button onClick={() => handleVote('upvote')}>Upvote</button>
      <button onClick={() => handleVote('downvote')}>Downvote</button>
    </div>
  );
}

export default Vote;