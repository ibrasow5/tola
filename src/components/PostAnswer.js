import React, { useState } from 'react';
import axios from 'axios';
import '../css/Dashboard.css';

function PostAnswer({ questionId }) {
  const [body, setBody] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:5000/answers', { userId: 1, questionId, body })
      .then(response => {
        setBody('');
      })
      .catch(error => console.error('Error posting answer:', error));
  };

  return (
    <form className="post-answer-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="body">Votre réponse</label>
        <textarea
          id="body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
        />
      </div>
      <button type="submit">Poster</button>
    </form>
  );
}

export default PostAnswer;