import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
    // Fetch initial data when the component mounts
    axios.get('http://localhost:8080/goals?page=0&size=10')
      .then((response) => {
        setGoals(response.data);
      })
      .catch((error) => {
        console.error('Error fetching goals:', error);
      });
  }, []);

  const addGoal = () => {
    if (newGoal.trim() !== '') {
      const newGoalData = {
        title: newGoal,
        description: newGoalDescription,
        startDate: newStartDate,
        endDate: newEndDate,
      };

      axios.post('http://localhost:8080/goals', newGoalData)
        .then((response) => {
          console.log('Goal added successfully:', response.data);
          setNewGoal('');
          setNewGoalDescription('');
          setNewStartDate('');
          setNewEndDate('');
          closeModal();

          axios.get('http://localhost:8080/goals?page=0&size=10')
            .then((response) => {
              setGoals(response.data);
            })
            .catch((error) => {
              console.error('Error fetching goals:', error);
            });
        })
        .catch((error) => {
          console.error('Error adding goal:', error);
        });
    }
  };

  const deleteGoal = (goalId) => {
    axios.delete(`http://localhost:8080/goals/${goalId}`)
      .then((response) => {
        console.log('Goal deleted successfully:', response.data);
        setGoals(goals.filter((goal) => goal.id !== goalId));
      })
      .catch((error) => {
        console.error('Error deleting goal:', error);
      });
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
    if (newGoal.trim() !== '') {
      if (editGoalId !== null) {
        setGoals((prevGoals) =>
          prevGoals.map((goal) =>
            goal.id === editGoalId
              ? {
                  ...goal,
                  title: newGoal,
                  description: newGoalDescription,
                  startDate: newStartDate,
                  endDate: newEndDate,
                }
              : goal
          )
        );
        closeModal();
      } else {
        setGoals([
          ...goals,
          {
            id: Date.now(),
            title: newGoal,
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
      }
    }
  };

  const editGoal = (goalId) => {
    setEditGoalId(goalId);
    const goalToEdit = goals.find((goal) => goal.id === goalId);
    setNewGoal(goalToEdit.title);
    setNewGoalDescription(goalToEdit.description);
    setNewStartDate(goalToEdit.startDate);
    setNewEndDate(goalToEdit.endDate);
    openModal();
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
