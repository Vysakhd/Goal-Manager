


// import React, { useState } from 'react';
// import GoalList from './components/GoalList';
// import './App.css';

// function App() {
//   const [goals, setGoals] = useState([]);
//   const [newGoal, setNewGoal] = useState('');
//   const [newGoalDescription, setNewGoalDescription] = useState('');
//   const [editGoalId, setEditGoalId] = useState(null);
//   const [isModalOpen, setModalOpen] = useState(false);
//   const [newStartDate, setNewStartDate] = useState('');
//   const [newEndDate, setNewEndDate] = useState('');

//   const addGoal = () => {
//     if (newGoal.trim() !== '') {
//       setGoals([
//         ...goals,
//         {
//           id: Date.now(),
//           text: newGoal,
//           description: newGoalDescription,
//           progress: 0,
//           startDate: newStartDate,
//           endDate: newEndDate,
//         },
//       ]);
//       setNewGoal('');
//       setNewGoalDescription('');
//       setNewStartDate('');
//       setNewEndDate('');
//       closeModal();
//     }
//   };

//   const deleteGoal = (goalId) => {
//     setGoals(goals.filter((goal) => goal.id !== goalId));
//   };

//   const editGoal = (goalId) => {
//     setEditGoalId(goalId);
//     const goalToEdit = goals.find((goal) => goal.id === goalId);
//     setNewGoal(goalToEdit.text);
//     setNewGoalDescription(goalToEdit.description);
//     setNewStartDate(goalToEdit.startDate);
//     setNewEndDate(goalToEdit.endDate);
//     openModal();
//   };

//   const openModal = () => {
//     setModalOpen(true);
//   };

//   const closeModal = () => {
//     setModalOpen(false);
//     setEditGoalId(null);
//   };

//   const saveGoal = () => {
//     if (newGoal.trim() !== '') {
//       if (editGoalId !== null) {
//         setGoals((prevGoals) =>
//           prevGoals.map((goal) =>
//             goal.id === editGoalId
//               ? {
//                   ...goal,
//                   text: newGoal,
//                   description: newGoalDescription,
//                   startDate: newStartDate,
//                   endDate: newEndDate,
//                 }
//               : goal
//           )
//         );
//       } else {
//         setGoals([
//           ...goals,
//           {
//             id: Date.now(),
//             text: newGoal,
//             description: newGoalDescription,
//             progress: 0,
//             startDate: newStartDate,
//             endDate: newEndDate,
//           },
//         ]);
//       }
//       setNewGoal('');
//       setNewGoalDescription('');
//       setNewStartDate('');
//       setNewEndDate('');
//       closeModal();
//     }
//   };

//   const updateProgress = (goalId, newProgress) => {
//     setGoals((prevGoals) =>
//       prevGoals.map((goal) =>
//         goal.id === goalId ? { ...goal, progress: newProgress } : goal
//       )
//     );
//   };

//   return (
//     <div className="container mx-auto p-4 bg-gray-100">
//       <h1 className="text-3xl font-bold mb-4 text-center text-blue-800">
//         Goal Management App
//       </h1>
//       <div className="flex items-center space-x-2 bg-white p-2 rounded-md mb-4">
//         <input
//           type="text"
//           placeholder="Enter Your Goal"
//           className="w-2/5 p-2 border rounded"
//           value={newGoal}
//           onChange={(e) => setNewGoal(e.target.value)}
//         />
//         <input
//           type="text"
//           placeholder="Goal Updates"
//           className="w-2/5 p-2 border rounded"
//           value={newGoalDescription}
//           onChange={(e) => setNewGoalDescription(e.target.value)}
//         />
//         <input
//           type="date"
//           placeholder="Start Date"
//           className="w-1/5 p-2 border rounded"
//           value={newStartDate}
//           onChange={(e) => setNewStartDate(e.target.value)}
//         />
//         <input
//           type="date"
//           placeholder="End Date"
//           className="w-1/5 p-2 border rounded"
//           value={newEndDate}
//           onChange={(e) => setNewEndDate(e.target.value)}
//         />
//         <button
//           onClick={addGoal}
//           className="bg-green-500 text-white p-2 rounded-md"
//         >
//           Add Goal
//         </button>
//       </div>
//       <GoalList goals={goals} onDelete={deleteGoal} onEdit={editGoal} updateProgress={updateProgress} />
//     </div>
//   );
// }

// export default App;


import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios

import GoalList from './components/GoalList';

function App() {
  const [goals, setGoals] = useState([]);
  const [newGoal, setNewGoal] = useState('');
  const [newGoalDescription, setNewGoalDescription] = useState('');
  const [editGoalId, setEditGoalId] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [newStartDate, setNewStartDate] = useState('');
  const [newEndDate, setNewEndDate] = useState('');

  useEffect(() => {
    // Fetch goals from your API on component mount (or wherever appropriate)
    axios.get('http://localhost:8080/goals')
      .then((response) => {
        setGoals(response.data);
      })
      .catch((error) => {
        console.error('Error fetching goals:', error);
      });
  }, []);

  const addGoal = () => {
    if (newGoal.trim() !== '') {
      // Create a goal object with the necessary data
      const goalData = {
        text: newGoal,
        description: newGoalDescription,
        progress: 0,
        startDate: newStartDate,
        endDate: newEndDate,
      };

      // Send a POST request to your API
      axios.post('http://localhost:8080/goals', goalData)
        .then((response) => {
          // Handle the response, you can update your state or perform other actions if needed
          console.log('Goal added successfully:', response.data);

          // Clear input fields and close the modal
          setNewGoal('');
          setNewGoalDescription('');
          setNewStartDate('');
          setNewEndDate('');

          closeModal();

          // You may also fetch goals again to refresh the list
          axios.get('http://localhost:8080/goals')
            .then((response) => {
              setGoals(response.data);
            })
            .catch((error) => {
              console.error('Error fetching goals:', error);
            });
        })
        .catch((error) => {
          // Handle any errors that occurred during the request
          console.error('Error adding goal:', error);
        });
    }
  };

  const deleteGoal = (goalId) => {
    // Handle goal deletion here, you can use Axios to send a DELETE request to your API
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditGoalId(null);
    setNewGoal('');
    setNewGoalDescription('');
    setNewStartDate('');
    setNewEndDate('');
  };

  const saveGoal = () => {
    // Handle goal save or edit here, you can use Axios to send a PUT or PATCH request to your API
  };

  const editGoal = (goalId) => {
    // Handle goal editing here
  };

  const updateProgress = (goalId, newProgress) => {
    // Handle updating the progress of a goal, you can use Axios to send a PUT or PATCH request to your API
  };

  return (
    <div className="container mx-auto p-4 bg-gray-100">
      <h1 className="text-3xl font-bold mb-4 text-center text-blue-800">
        Goal Management App
      </h1>
      <div className="flex items-center space-x-2 bg-white p-2 rounded-md mb-4">
        <input
          type="text"
          placeholder="Enter Your Goal"
          className="w-2/5 p-2 border rounded"
          value={newGoal}
          onChange={(e) => setNewGoal(e.target.value)}
        />
        <input
          type="text"
          placeholder="Goal Updates"
          className="w-2/5 p-2 border rounded"
          value={newGoalDescription}
          onChange={(e) => setNewGoalDescription(e.target.value)}
        />
        <input
          type="date"
          placeholder="Start Date"
          className="w-1/5 p-2 border rounded"
          value={newStartDate}
          onChange={(e) => setNewStartDate(e.target.value)}
        />
        <input
          type="date"
          placeholder="End Date"
          className="w-1/5 p-2 border rounded"
          value={newEndDate}
          onChange={(e) => setNewEndDate(e.target.value)}
        />
        <button
          onClick={addGoal}
          className="bg-green-500 text-white p-2 rounded-md"
        >
          Add Goal
        </button>
      </div>
      <GoalList goals={goals} onDelete={deleteGoal} onEdit={editGoal} updateProgress={updateProgress} />
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="modal-container">
            <div className="bg-white rounded shadow-lg p-4">
              <h2 className="text-lg font-semibold mb-4">
                {editGoalId !== null ? 'Edit Goal' : 'Add Goal'}
              </h2>
              <input
                type="text"
                placeholder="Enter Your Goal"
                className="w-full p-2 mb-2 border rounded"
                value={newGoal}
                onChange={(e) => setNewGoal(e.target.value)}
              />
              <input
                type="text"
                placeholder="Goal Updates"
                className="w-full p-2 mb-2 border rounded"
                value={newGoalDescription}
                onChange={(e) => setNewGoalDescription(e.target.value)}
              />
              <div className="flex space-x-2">
                <input
                  type="date"
                  placeholder="Start Date"
                  className="w-1/2 p-2 border rounded"
                  value={newStartDate}
                  onChange={(e) => setNewStartDate(e.target.value)}
                />
                <input
                  type="date"
                  placeholder="End Date"
                  className="w-1/2 p-2 border rounded"
                  value={newEndDate}
                  onChange={(e) => setNewEndDate(e.target.value)}
                />
              </div>
              <div className="flex justify-end">
                <button
                  onClick={saveGoal}
                  className="bg-blue-500 text-white p-2 rounded-md mr-2"
                >
                  Save
                </button>
                <button
                  onClick={closeModal}
                  className="bg-red-500 text-white p-2 rounded-md"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
