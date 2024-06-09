import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Logo from '../Tola5.png';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [themes, setThemes] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/signup', { email, password, themes });
      navigate('/login');
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  const handleThemeChange = (e) => {
    const { value, checked } = e.target;
    setThemes((prev) => 
      checked ? [...prev, value] : prev.filter((theme) => theme !== value)
    );
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
          <h1 className="auth-form-title">S'inscrire</h1>
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
          <div className="theme-selection">
            <h3>Sélectionner vos thèmes de connaissances</h3>
            <label className="theme-label">
              <input className="theme-checkbox" type="checkbox" value="math" onChange={handleThemeChange} />
              <span className="theme">Maths</span>
            </label>
            <label className="theme-label">
              <input className="theme-checkbox" type="checkbox" value="science" onChange={handleThemeChange} />
              <span className="theme">Science</span>
            </label>
            <label className="theme-label">
              <input className="theme-checkbox" type="checkbox" value="history" onChange={handleThemeChange} />
              <span className="theme">Histoire</span>
            </label>
            <label className="theme-label">
              <input className="theme-checkbox" type="checkbox" value="literature" onChange={handleThemeChange} />
              <span className="theme">Littérature</span>
            </label>
          </div>

          <button className="auth-form-button" type="submit">S'inscrire</button>
        </form>
      </main>
    </>
  );
}

export default Signup;
