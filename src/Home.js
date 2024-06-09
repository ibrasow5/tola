// Home.js
import React from 'react';

function Home() {
  return (
    <>
      <header>
        <h1>Bienvenue sur Tola</h1>
      </header>
      <main>
        <p>Tola est une plateforme qui permet aux étudiants de l’ESP de poser des questions et d’y répondre.</p>
        <p>Connectez-vous pour commencer à explorer les questions et les réponses.</p>
        <a href="/login">Se connecter</a>
        <br />
        <a href="/signup">S'inscrire</a>
      </main>
      <footer>
        <p>&copy; 2024 Tola. Tous droits réservés.</p>
      </footer>
    </>
  );
}

export default Home;
