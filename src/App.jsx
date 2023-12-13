
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Goal from './pages/Goal';
import GoalDetails from '../src/pages/GoalDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Goal />} />
        <Route path="/details/:id" element={<GoalDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
