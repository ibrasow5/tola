import React, { useEffect, useState } from "react";
import axios from 'axios';
import '../css/Dashboard.css';

function Vote({ userId, type, id }) {
  const [votes, setVotes] = useState({ upvotes: 0, downvotes: 0 });

  useEffect(() => {
    axios.get(`http://localhost:5000/votes/${type}/${id}`)
      .then(response => setVotes(response.data))
      .catch(error => console.error('Error fetching votes:', error));
  }, [type, id]);

  const handleVote = (voteType) => {
    axios.post('http://localhost:5000/votes', { userId, type, id, voteType })
      .then(response => {
        setVotes(prevVotes => ({
          ...prevVotes,
          [voteType === 'upvote' ? 'upvotes' : 'downvotes']: prevVotes[voteType === 'upvote' ? 'upvotes' : 'downvotes'] + 1
        }));
      })
      .catch(error => console.error('Error voting:', error));
  };

  return (
    <div className="vote-container">
      <button onClick={() => handleVote('upvote')}>Upvote ({votes.upvotes})</button>
      <button onClick={() => handleVote('downvote')}>Downvote ({votes.downvotes})</button>
    </div>
  );
}

export default Vote;