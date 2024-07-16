import React, { useEffect, useState } from "react";
import axios from 'axios';
import '../css/Dashboard.css';

function Vote({ userId, type, id }) {
  const [votes, setVotes] = useState({ upvotes: 0, downvotes: 0 });
  const [userVote, setUserVote] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/votes/${type}/${id}`)
      .then(response => {
        setVotes(response.data.votes);
        setUserVote(response.data.userVote); // Assurez-vous que l'API renvoie également le vote de l'utilisateur
      })
      .catch(error => console.error('Error fetching votes:', error));
  }, [type, id]);

  const handleVote = (voteType) => {
    if (userVote === voteType) {
      // Remove the vote
      axios.post('http://localhost:5000/votes', { userId, type, id, voteType: null })
        .then(response => {
          setVotes(prevVotes => ({
            ...prevVotes,
            [voteType === 'upvote' ? 'upvotes' : 'downvotes']: prevVotes[voteType === 'upvote' ? 'upvotes' : 'downvotes'] - 1
          }));
          setUserVote(null);
        })
        .catch(error => console.error('Error voting:', error));
    } else {
      // Add or change the vote
      axios.post('http://localhost:5000/votes', { userId, type, id, voteType })
        .then(response => {
          setVotes(prevVotes => ({
            ...prevVotes,
            [voteType === 'upvote' ? 'upvotes' : 'downvotes']: prevVotes[voteType === 'upvote' ? 'upvotes' : 'downvotes'] + (userVote ? -1 : 1)
          }));
          setUserVote(voteType);
        })
        .catch(error => console.error('Error voting:', error));
    }
  };

  return (
    <div className="vote-container">
      <button className={`upvote ${userVote === 'upvote' ? 'voted' : ''}`} onClick={() => handleVote('upvote')}>Upvote ({votes.upvotes})</button>
      <button className={`downvote ${userVote === 'downvote' ? 'voted' : ''}`} onClick={() => handleVote('downvote')}>Downvote ({votes.downvotes})</button>
    </div>
  );
}

export default Vote;
