import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/login.css';
import Logo from '../Tola5.png';
import { Link } from 'react-router-dom';

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
      <div className="logo-container">
          <img src={Logo} alt="Logo Tola" className="logo" width="100" height="auto" />
        </div>
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
          <div>Pas de compte? Inscrivez-vous <Link to="/signup">ici</Link></div>
        </form>
      </main>
    </>
  );
}

export default Login;
