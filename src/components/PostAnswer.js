import React, { useState } from 'react';
import axios from 'axios';
import '../css/Dashboard.css';

function PostAnswer({ questionId }) {
  const [body, setBody] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:5000/answers', { userId: 1, questionId, body })  // Assume userId is 1 for this example
      .then(response => {
        setBody('');
      })
      .catch(error => console.error('Error posting answer:', error));
  };

  return (
    <form className="post-answer-form" onSubmit={handleSubmit}>
      <h3>Poster une réponse</h3>
      <div className="form-group">
        <textarea 
          id="body" 
          value={body} 
          onChange={(e) => setBody(e.target.value)} 
          required 
          placeholder="Votre réponse..."
        />
      </div>
      <button type="submit">Répondre</button>
    </form>
  );
}

export default PostAnswer;