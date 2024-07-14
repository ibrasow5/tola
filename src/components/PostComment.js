import React, { useState } from 'react';
import axios from 'axios';

function PostComment({ answerId }) {
  const [body, setBody] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/comments', { answerId, body });
      if (response.data.success) {
        // Refresh comments list or provide feedback
      }
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        placeholder="Write your comment"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        required
      ></textarea>
      <button type="submit">Post Comment</button>
    </form>
  );
}

export default PostComment;
