
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
//     <div className="container mx-auto p-4">
//       <h1 className="text-3xl font-bold mb-4 text-center">Goal Management App</h1>
//       <div className="flex items-center space-x-2">
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
//       <div
//         className={`fixed inset-0 flex items-center justify-center z-50 ${
//           isModalOpen ? '' : 'hidden'
//         }`}
//       >
//         <div className="modal-container">
//           <div className="bg-white rounded shadow-lg p-4">
//             <h2 className="text-lg font-semibold mb-4">
//               {editGoalId !== null ? 'Edit Goal' : 'Add Goal'}
//             </h2>
//             <input
//               type="text"
//               placeholder="Enter Your Goal"
//               className="w-full p-2 mb-2 border rounded"
//               value={newGoal}
//               onChange={(e) => setNewGoal(e.target.value)}
//             />
//             <input
//               type="text"
//               placeholder="Goal Updates"
//               className="w-full p-2 mb-2 border rounded"
//               value={newGoalDescription}
//               onChange={(e) => setNewGoalDescription(e.target.value)}
//             />
//             <input
//               type="date"
//               placeholder="Start Date"
//               className="w-full p-2 mb-2 border rounded"
//               value={newStartDate}
//               onChange={(e) => setNewStartDate(e.target.value)}
//             />
//             <input
//               type="date"
//               placeholder="End Date"
//               className="w-full p-2 mb-2 border rounded"
//               value={newEndDate}
//               onChange={(e) => setNewEndDate(e.target.value)}
//             />
//             <div className="flex justify-end">
//               <button
//                 onClick={saveGoal}
//                 className="bg-blue-500 text-white p-2 rounded-md mr-2"
//               >
//                 Save
//               </button>
//               <button
//                 onClick={closeModal}
//                 className="bg-red-500 text-white p-2 rounded-md"
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//       <GoalList goals={goals} onDelete={deleteGoal} onEdit={editGoal} updateProgress={updateProgress} />
//     </div>
//   );
// }

// export default App;


import React, { useState } from 'react';
import GoalList from './components/GoalList';
import './App.css';

function App() {
  const [goals, setGoals] = useState([]);
  const [newGoal, setNewGoal] = useState('');
  const [newGoalDescription, setNewGoalDescription] = useState('');
  const [editGoalId, setEditGoalId] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [newStartDate, setNewStartDate] = useState('');
  const [newEndDate, setNewEndDate] = useState('');

  const addGoal = () => {
    if (newGoal.trim() !== '') {
      setGoals([
        ...goals,
        {
          id: Date.now(),
          text: newGoal,
          description: newGoalDescription,
          progress: 0,
          startDate: newStartDate,
          endDate: newEndDate,
        },
      ]);
      setNewGoal('');
      setNewGoalDescription('');
      setNewStartDate('');
      setNewEndDate('');
      closeModal();
    }
  };

  const deleteGoal = (goalId) => {
    setGoals(goals.filter((goal) => goal.id !== goalId));
  };

  const editGoal = (goalId) => {
    setEditGoalId(goalId);
    const goalToEdit = goals.find((goal) => goal.id === goalId);
    setNewGoal(goalToEdit.text);
    setNewGoalDescription(goalToEdit.description);
    setNewStartDate(goalToEdit.startDate);
    setNewEndDate(goalToEdit.endDate);
    openModal();
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditGoalId(null);
  };

  const saveGoal = () => {
    if (newGoal.trim() !== '') {
      if (editGoalId !== null) {
        setGoals((prevGoals) =>
          prevGoals.map((goal) =>
            goal.id === editGoalId
              ? {
                  ...goal,
                  text: newGoal,
                  description: newGoalDescription,
                  startDate: newStartDate,
                  endDate: newEndDate,
                }
              : goal
          )
        );
      } else {
        setGoals([
          ...goals,
          {
            id: Date.now(),
            text: newGoal,
            description: newGoalDescription,
            progress: 0,
            startDate: newStartDate,
            endDate: newEndDate,
          },
        ]);
      }
      setNewGoal('');
      setNewGoalDescription('');
      setNewStartDate('');
      setNewEndDate('');
      closeModal();
    }
  };

  const updateProgress = (goalId, newProgress) => {
    setGoals((prevGoals) =>
      prevGoals.map((goal) =>
        goal.id === goalId ? { ...goal, progress: newProgress } : goal
      )
    );
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
    </div>
  );
}

export default App;
