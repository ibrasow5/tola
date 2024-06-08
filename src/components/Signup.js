import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { auth, firestore } from '../firebase';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [themes, setThemes] = useState([]);
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await auth.createUserWithEmailAndPassword(email, password);
      await firestore.collection('users').doc(userCredential.user.uid).set({
        email,
        themes
      });
      history.push('/dashboard'); // Rediriger vers le dashboard
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
    <form onSubmit={handleSubmit}>
      <h1>Signup</h1>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <div>
        <h3>Select your themes of knowledge:</h3>
        <label>
          <input type="checkbox" value="math" onChange={handleThemeChange} />
          Math
        </label>
        <label>
          <input type="checkbox" value="science" onChange={handleThemeChange} />
          Science
        </label>
        <label>
          <input type="checkbox" value="history" onChange={handleThemeChange} />
          History
        </label>
        <label>
          <input type="checkbox" value="literature" onChange={handleThemeChange} />
          Literature
        </label>
        {/* Ajoutez d'autres thèmes ici */}
      </div>
      <button type="submit">Sign Up</button>
    </form>
  );
}

export default Signup;
