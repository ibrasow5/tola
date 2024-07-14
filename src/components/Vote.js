import React from 'react';
import axios from 'axios';

function Vote({ answerId }) {
  const handleVote = async (voteType) => {
    try {
      const response = await axios.post('http://localhost:5000/votes', { answerId, voteType });
      if (response.data.success) {
        // Refresh votes count or provide feedback
      }
    } catch (error) {
      console.error('Error voting:', error);
    }
  };

  return (
    <div>
      <button onClick={() => handleVote('upvote')}>Upvote</button>
      <button onClick={() => handleVote('downvote')}>Downvote</button>
    </div>
  );
}

export default Vote;
