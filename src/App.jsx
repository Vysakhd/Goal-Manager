// import React, { useState } from 'react';
// import GoalList from './GoalList';

// function App() {
//   const [goals, setGoals] = useState([]);
//   const [newGoal, setNewGoal] = useState('');
//   const [newGoalDescription, setNewGoalDescription] = useState('');
//   const [editGoalId, setEditGoalId] = useState(null);
//   const [isModalOpen, setModalOpen] = useState(false);

//   const addGoal = () => {
//     if (newGoal.trim() !== '') {
//       setGoals([...goals, { id: Date.now(), text: newGoal, description: newGoalDescription }]);
//       setNewGoal('');
//       setNewGoalDescription('');
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
//         // Editing an existing goal
//         setGoals((prevGoals) =>
//           prevGoals.map((goal) =>
//             goal.id === editGoalId ? { ...goal, text: newGoal, description: newGoalDescription } : goal
//           )
//         );
//       } else {
//         // Adding a new goal
//         setGoals([...goals, { id: Date.now(), text: newGoal, description: newGoalDescription }]);
//       }
//       setNewGoal('');
//       setNewGoalDescription('');
//       closeModal();
//     }
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-3xl font-bold mb-4 text-center">Goal Management App</h1>
//       <div className="flex">
//         <button
//           onClick={openModal}
//           className="bg-green-500 text-white p-2 rounded-md mr-2 "
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
//               className="w-full p-[2px] mb-[4px] border rounded"
//               value={newGoalDescription}
//               onChange={(e) => setNewGoalDescription(e.target.value)}
//             />
//             <div className="flex justify-end">
//               <button
//                 onClick={saveGoal}
//                 className="bg-blue-500 text-white p-[2px] rounded-md mr-[2px]"
//               >
//                 Save
//               </button>
//               <button
//                 onClick={closeModal}
//                 className="bg-red-500 text-white p-[2px] rounded-md"
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//       <GoalList newGoalDescription={newGoalDescription} goals={goals} onDelete={deleteGoal} onEdit={editGoal} />
//     </div>
//   );
// }

// export default App;





import React, { useState } from 'react';
import GoalList from './GoalList';

function App() {
  const [goals, setGoals] = useState([]);
  const [newGoal, setNewGoal] = useState('');
  const [newGoalDescription, setNewGoalDescription] = useState('');
  const [editGoalId, setEditGoalId] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const addGoal = () => {
    if (newGoal.trim() !== '') {
      setGoals([...goals, { id: Date.now(), text: newGoal, description: newGoalDescription, progress: 0 }]);
      setNewGoal('');
      setNewGoalDescription('');
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
              ? { ...goal, text: newGoal, description: newGoalDescription }
              : goal
          )
        );
      } else {
        
        setGoals([...goals, { id: Date.now(), text: newGoal, description: newGoalDescription, progress: 0 }]);
      }
      setNewGoal('');
      setNewGoalDescription('');
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
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">Goal Management App</h1>
      <div className="flex">
        <button
          onClick={openModal}
          className="bg-green-500 text-white p-2 rounded-md mr-2"
        >
          Add Goal
        </button>
      </div>
      <div
        className={`fixed inset-0 flex items-center justify-center z-50 ${
          isModalOpen ? '' : 'hidden'
        }`}
      >
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
              className="w-full p-[2px] mb-[4px] border rounded"
              value={newGoalDescription}
              onChange={(e) => setNewGoalDescription(e.target.value)}
            />
            <div className="flex justify-end">
              {editGoalId !== null ? (
                <>
                  <button
                    onClick={saveGoal}
                    className="bg-blue-500 text-white p-[2px] rounded-md mr-[2px]"
                  >
                    Save
                  </button>
                  <button
                    onClick={closeModal}
                    className="bg-red-500 text-white p-[2px] rounded-md"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => deleteGoal(editGoalId)}
                    className="bg-red-500 text-white p-[2px] rounded-md ml-[2px]"
                  >
                    Delete
                  </button>
                </>
              ) : (
                <button
                  onClick={addGoal}
                  className="bg-blue-500 text-white p-[2px] rounded-md"
                >
                  Save Goal
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <GoalList goals={goals} onDelete={deleteGoal} onEdit={editGoal} updateProgress={updateProgress} />
    </div>
  );
}

export default App;


