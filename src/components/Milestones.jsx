import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GoalUpdatesList = ({ updates, onDeleteMilestone }) => {
  return (
    <ul className="list-disc pl-6">
      {updates.map(update => (
        <li key={update.id} className="mb-2">
          <input type="checkbox" checked={update.completed} readOnly className="mr-2" />
          {update.updateText}
          <button
            onClick={() => onDeleteMilestone(update.id)}
            className="ml-2 bg-red-500 text-white p-2 rounded-md hover:bg-red-600"
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

function Milestones({ editGoalId, onAddMilestone, onDeleteMilestone }) {
  const [newMilestone, setNewMilestone] = useState('');
  const [addedMilestones, setAddedMilestones] = useState([]);
  const [updatedData, setUpdatedData] = useState([]);

  const addMilestone = async () => {
    if (newMilestone.trim() !== '' && editGoalId) {
      const milestoneData = {
        id: Date.now(),
        text: newMilestone,
        completed: false,
      };
      try {
        const response = await axios.post(`http://localhost:8080/goals/${editGoalId}`, {
          updateText: newMilestone,
        });

        const createdMilestone = response.data;

        onAddMilestone(createdMilestone);
        setNewMilestone('');
        setAddedMilestones([...addedMilestones, createdMilestone]);

        const fetchDataResponse = await axios.get(`http://localhost:8080/goals/${editGoalId}`);
        setUpdatedData(fetchDataResponse?.data?.milestones);
      } catch (error) {
        console.error('Error adding milestone:', error);
      }
    }
  };

  const deleteMilestone = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/goals/${editGoalId}/milestone/${id}`);
      onDeleteMilestone(id);

      // Update state to trigger re-render
      const updatedMilestones = addedMilestones.filter((milestone) => milestone.id !== id);
      setAddedMilestones(updatedMilestones);

      // Fetch and update the latest data
      const fetchDataResponse = await axios.get(`http://localhost:8080/goals/${editGoalId}`);
      setUpdatedData(fetchDataResponse?.data?.milestones);
    } catch (error) {
      console.error('Error deleting milestone:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch milestones data
        const fetchDataResponse = await axios.get(`http://localhost:8080/goals/${editGoalId}`);
        setUpdatedData(fetchDataResponse?.data?.milestones);
      } catch (error) {
        console.error('Error fetching milestones:', error);
      }
    };

    // Fetch data when the component mounts if editGoalId is available
    if (editGoalId) {
      fetchData();
    }
  }, [editGoalId, updatedData]);

  return (
    <div className="max-w-md mx-auto mt-8 p-4 border rounded bg-white">
      <div className="flex space-x-2 mb-4">
        <input
          type="text"
          placeholder="Add Milestone"
          className="w-2/3 p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
          value={newMilestone}
          onChange={(e) => setNewMilestone(e.target.value)}
        />
        <button onClick={addMilestone} className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">
          Add
        </button>
      </div>

      {updatedData.length > 0 && (
        <div className="mt-4">
          <p className="text-gray-500 mb-2"> Milestones:</p>
          <GoalUpdatesList updates={updatedData} onDeleteMilestone={deleteMilestone} />
        </div>
      )}
    </div>
  );
}

export default Milestones;
