
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GoalList from '../components/GoalList';
import Milestones from '../components/Milestones';



function Goal() {
  const [goals, setGoals] = useState([]);
  const [newGoal, setNewGoal] = useState('');
  const [newGoalDescription, setNewGoalDescription] = useState('');
  const [editGoalId, setEditGoalId] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [newStartDate, setNewStartDate] = useState('');
  const [newEndDate, setNewEndDate] = useState('');
  const [milestones, setMilestones] = useState([]);
  const [milestoneText, setMilestoneText] = useState('');
  const [pageNumber, setPageNumber] = useState(0);

  useEffect(() => {
    axios.get(`http://localhost:8080/goals?page=${pageNumber}&size=6`)
      .then((response) => {
        setGoals(response.data);
        console.log('Goals fetched successfully:', response.data);
      })
      .catch((error) => {
        console.error('Error fetching goals:', error);
      });
  }, [pageNumber]);

  const addGoal = () => {
    if (newGoal.trim() !== '') {
      const newGoalData = {
        title: newGoal,
        description: newGoalDescription,
        startDate: newStartDate,
        endDate: newEndDate,
        milestones: milestones,
      };

      axios.post('http://localhost:8080/goals', newGoalData)
        .then((response) => {
          console.log('Goal added successfully:', response.data);
          setNewGoal('');
          setNewGoalDescription('');
          setNewStartDate('');
          setNewEndDate('');
          setMilestones([]);
          closeModal();
          updateGoalList();
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
        closeModal();
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
    setMilestones([]);
    setMilestoneText('');
  };

  const updateGoalList = () => {
    axios.get(`http://localhost:8080/goals?page=${pageNumber}&size=6`)
      .then((response) => {
        setGoals(response.data);
      })
      .catch((error) => {
        console.error('Error fetching goals:', error);
      });
  };



  const editGoal = (goalId) => {
    setEditGoalId(goalId);
    const goalToEdit = goals.find((goal) => goal.id === goalId);
    setNewGoal(goalToEdit.title);
    setNewGoalDescription(goalToEdit.description);
    setNewStartDate(goalToEdit.startDate);
    setNewEndDate(goalToEdit.endDate);
    setMilestones(goalToEdit.milestones || []);
    openModal();
  };

  const updateProgress = (goalId, newProgress) => {
    setGoals((prevGoals) =>
      prevGoals.map((goal) =>
        goal.id === goalId ? { ...goal, progress: newProgress } : goal
      )
    );
  };

  const addMilestone = () => {
    if (milestoneText.trim() !== '') {
      setMilestones([...milestones, { id: Date.now(), text: milestoneText, completed: false }]);
      setMilestoneText('');
    }
  };

  const toggleMilestone = (milestoneId) => {
    setMilestones((prevMilestones) =>
      prevMilestones.map((milestone) =>
        milestone.id === milestoneId ? { ...milestone, completed: !milestone.completed } : milestone
      )
     
    );

  };
 const nextPage= () => {
       setPageNumber(pageNumber+1)
      }
      const prevPage= () => {
        setPageNumber(pageNumber-1)
       }

  return (
    <div className="container mx-auto p-4 bg-black rounded-xl ">
      <h1 className="text-3xl font-extrabold mb-4 text-center text-blue-800">
        Goal Management App
      </h1>
      <div className="flex items-center space-x-2 bg-black p-2 rounded-md mb-4">
        <input
          type="text"
          placeholder="Enter Your Goal"
          className="w-2/5 p-2 border rounded"
          value={newGoal}
          onChange={(e) => setNewGoal(e.target.value)}
        />
        <input
          type="text"
          placeholder="Goal Description"
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
      <GoalList goals={goals} onEdit={editGoal} updateProgress={updateProgress} />
      <div className='mt-[8px]'>
      <button className='text-white bg-blue-500 px-4 py-2 rounded mr-2' onClick={nextPage}>
  Next
</button>
<button className='text-white bg-blue-500 px-4 py-2 rounded ml-[1100px]' onClick={prevPage}>
  Prev
</button>
</div>

             

    </div>
  );
}

export default Goal;
