import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/login', { email, password });
      
      if (response.status === 200) {
        navigate('/dashboard');
      } else {
        setError('Invalid email or password.');
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setError('Error logging in. Please try again later.');
    }
  };
  
  

  return (
    <>
      <header className="home-header">
        <h1 className="home-title">Bienvenue sur Tola</h1>
      </header>
      <main className="auth-form-container">
        <form className="auth-form" onSubmit={handleSubmit}>
          <h1 className="auth-form-title">Se connecter</h1>
          {error && <p className="auth-form-error">{error}</p>} {/* Affichage du message d'erreur */}
          <input
            className="auth-form-input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <input
            className="auth-form-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Mot de passe"
            required
          />
          <button className="auth-form-button" type="submit">Se connecter</button>
        </form>
      </main>
    </>
  );
}

export default Login;
