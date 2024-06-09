import React, { useEffect } from 'react';
import Logo from '../Tola5.png';

function Dashboard() {
  return (
    <>
      <header className="home-header">
        <div className="logo-container">
          <img src={Logo} alt="Logo Tola" className="logo" width="100" height="auto" />
        </div>
      </header>
    <div>
        <>
          <h1>Dashboard</h1>
          {/* Ajoutez ici le contenu de votre tableau de bord */}
        </>
    </div>
    </>
  );
}

export default Dashboard;
