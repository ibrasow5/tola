import React, { useState } from 'react';
import axios from 'axios';
import '../css/Dashboard.css';

function PostComment({ answerId }) {
  const [body, setBody] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:5000/comments', { userId: 1, answerId, body })  // Assume userId is 1 for this example
      .then(response => {
        setBody('');
      })
      .catch(error => console.error('Error posting comment:', error));
  };

  return (
    <form className="post-comment-form" onSubmit={handleSubmit}>
      <h3>Poster un commentaire</h3>
      <div className="form-group">
        <textarea 
          id="body" 
          value={body} 
          onChange={(e) => setBody(e.target.value)} 
          required 
          placeholder="Votre commentaire..."
        />
      </div>
      <button type="submit">Commenter</button>
    </form>
  );
}

export default PostComment;