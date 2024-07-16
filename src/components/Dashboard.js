import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Logo from '../Tola5.png';
import axios from 'axios';
import PostQuestion from './PostQuestion';
import Question from './Question';
import '../css/Dashboard.css';


function Dashboard() {
  const [questions, setQuestions] = useState([]);
  const navigate = useNavigate(); 

  useEffect(() => {
    axios.get('http://localhost:5000/questions')
      .then(response => setQuestions(response.data))
      .catch(error => console.error('Error fetching questions:', error));
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate('../login'); 
  };

  return (
    <>
      <header className="home-header">
        <div className="logo-container">
        <a href="../dashboard"><img src={Logo} alt="Logo Tola" className="logo" width="100" height="auto" /></a>
        </div>
      </header>
    <div>
        <>
        <div className="logout-container">
          <button onClick={handleLogout}>Déconnexion</button>
        </div>
          <div className="dashboard-main">
            <div className="post-question-container">
              <PostQuestion />
            </div>
            <h1>Questions posées</h1>
            <div className="questions-list">
              {questions.sort((a, b) => b.upvotes - a.upvotes).map(question => (
                <Question key={question.id} question={question} />
              ))}
              </div>
            </div>
        </>
    </div>
    </>
  );
}

export default Dashboard;
