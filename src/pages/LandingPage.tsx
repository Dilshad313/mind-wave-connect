import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage: React.FC = () => {
  return (
    <div>
      <nav>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </nav>
      <h1>Welcome to MindWave</h1>
      <p>Your journey to mental wellness starts here.</p>
    </div>
  );
};

export default LandingPage;
