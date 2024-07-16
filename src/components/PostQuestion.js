import React, { useState } from 'react';

const PostQuestion = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userId = '4'; // Assignation directe de la valeur userId

    // Vérifiez que tous les champs requis sont présents
    if (!title || !body || !userId) {
      console.error('Tous les champs sont requis.');
      return;
    }

    const questionData = {
      title: title,
      body: body,
      userId: userId, 
    };

    console.log('Données envoyées:', questionData); 

    try {
      const response = await fetch('http://localhost:5000/questions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(questionData),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error('Erreur de réponse:', data); 
        throw new Error(data.error || 'Something went wrong');
      }

      console.log('Question postée avec succès', data);
      
      // Réinitialiser les champs après soumission réussie
      setTitle('');
      setBody('');

    } catch (error) {
      console.error('Erreur lors de la publication de la question', error);
    }
  };

  return (
    <form className="post-question-form" onSubmit={handleSubmit}>
      <h2>Poser une question</h2>
      <div className="form-group">
        <label>Titre</label>
        <input 
          type="text" 
          id="title" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          required 
        />
      </div>
      <div className="form-group">
        <label>Contenu</label>
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
};

export default PostQuestion;
