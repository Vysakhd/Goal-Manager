// import React from 'react';
// import Goal from './pages/Goal';
// import GoalDetails from '../src/pages/GoalDetails';

// function App() {
//   return (
//     <>
//     <div>
//       <Goal />
//       <GoalDetails />

      
//     </div>
//     </>
//   );
// }

// export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Goal from './pages/Goal';
import GoalDetails from '../src/pages/GoalDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Goal />} />
        <Route path="/goal-details" element={<GoalDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
