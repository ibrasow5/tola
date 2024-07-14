import React, { useState } from 'react';
import axios from 'axios';
import '../css/Dashboard.css';

function PostQuestion() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:5000/questions', { title, body })
      .then(response => {
        setTitle('');
        setBody('');
      })
      .catch(error => console.error('Error posting question:', error));
  };

  return (
    <form className="post-question-form" onSubmit={handleSubmit}>
      <h2>Poser une question</h2>
      <div className="form-group">
        <label htmlFor="title">Titre</label>
        <input 
          type="text" 
          id="title" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          required 
        />
      </div>
      <div className="form-group">
        <label htmlFor="body">Contenu</label>
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

export default PostQuestion;
