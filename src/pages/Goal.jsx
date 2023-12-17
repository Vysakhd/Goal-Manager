import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGoals, addGoal } from '../goalsSlice'; 
import GoalList from '../components/GoalList';


function Goal() {
  const dispatch = useDispatch();
  const goals = useSelector((state) => state.goals.goals);
  

  const [newGoal, setNewGoal] = useState('');
  const [newGoalDescription, setNewGoalDescription] = useState('');
  const [newStartDate, setNewStartDate] = useState('');
  const [newEndDate, setNewEndDate] = useState('');
  const [milestones, setMilestones] = useState([]);
  const [editGoalId, setEditGoalId] = useState();
  const [pageNumber, setPageNumber] = useState(0);

  useEffect(() => {
    dispatch(fetchGoals(pageNumber));
  }, [dispatch, pageNumber]);

  const addGoalHandler = () => {
    dispatch(
      addGoal({
        title: newGoal,
        description: newGoalDescription,
        startDate: newStartDate,
        endDate: newEndDate,
        milestones: milestones,
      })
    );
  };

  const editGoal = (goalId) => {
    setEditGoalId(goalId);
    const goalToEdit = goals.find((goal) => goal.id === goalId);
    setNewGoal(goalToEdit.title);
    setNewGoalDescription(goalToEdit.description);
    setNewStartDate(goalToEdit.startDate);
    setNewEndDate(goalToEdit.endDate);
    setMilestones(goalToEdit.milestones || []);
  };

  const updateProgress = (goalId, newProgress) => {
    setGoals((prevGoals) =>
      prevGoals.map((goal) =>
        goal.id === goalId ? { ...goal, progress: newProgress } : goal
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
        <label className="block text-sm font-medium text-white mb-1">Start Date</label>
<input
  type="date"
  placeholder="Start Date"
  className="w-1/5 p-2 border rounded"
  value={newStartDate}
  onChange={(e) => setNewStartDate(e.target.value)}
/>

<label className="block text-sm font-medium text-white mb-1">End Date</label>
<input
  type="date"
  placeholder="End Date"
  className="w-1/5 p-2 border rounded"
  value={newEndDate}
  onChange={(e) => setNewEndDate(e.target.value)}
/>

        <button
          onClick={addGoalHandler}
          className="bg-green-500 text-white p-2 rounded-md"
        >
          Add Goal
        </button> 
        
      </div>
      <GoalList goals={goals} onEdit={editGoal} updateProgress={updateProgress} />
      <div className='mt-[8px]'>
      <button className='text-white bg-blue-500 px-4 py-2 rounded mr-2' onClick={prevPage}>
  Prev
</button>
<button className='text-white bg-blue-500 px-4 py-2 rounded ml-[1100px]' onClick={nextPage}>
  Next
</button>
</div>

             

    </div>
  );
}

export default Goal;
