// Home.js
import React from 'react';
import './css/Home.css'; 
import Logo from './Tola5.png';

function Home() {
  return (
    <>
      <header className="home-header">
        <h1 className="home-title">Bienvenue sur Tola</h1>
      </header>
      <main className="home-main">        
        <p className="home-description">
          Tola est une plateforme qui permet aux étudiants de l’ESP de poser des questions et d’y répondre.
        </p>
        <p className="home-description">
          Connectez-vous pour commencer à explorer les questions et les réponses.
        </p>
        <div className="logo-container">
          <img src={Logo} alt="Logo Tola" className="logo" width="160" height="auto" />
        </div>
        <div className="home-links">
          <a href="/login" className="home-link">Se connecter</a>
          <a href="/signup" className="home-link">S'inscrire</a>
        </div>
      </main>
      <footer className="home-footer">
        <p>&copy; 2024 Tola. Tous droits réservés.</p>
      </footer>
    </>
  );
}

export default Home;
