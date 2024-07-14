import React, { useState } from 'react';
import axios from 'axios';

function PostQuestion() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/questions', { title, body });
      if (response.data.success) {
        // Refresh questions list or provide feedback
      }
    } catch (error) {
      console.error('Error posting question:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Titre"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Contenu"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        required
      ></textarea>
      <button type="submit">Post Question</button>
    </form>
  );
}

export default PostQuestion;
