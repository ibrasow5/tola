import React, { useState } from 'react';
import axios from 'axios';

function PostAnswer({ questionId }) {
  const [body, setBody] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/answers', { questionId, body });
      if (response.data.success) {
        // Refresh answers list or provide feedback
      }
    } catch (error) {
      console.error('Error posting answer:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        placeholder="Write your answer"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        required
      ></textarea>
      <button type="submit">Post Answer</button>
    </form>
  );
}

export default PostAnswer;
