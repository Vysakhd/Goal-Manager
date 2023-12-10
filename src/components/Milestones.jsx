import GoalUpdatesList from "./GoalUpdateList";
import React, { useState, useEffect } from 'react';
import axios from "axios";

function Milestones({ goalId, onAddMilestone }) {
  const [newMilestone, setNewMilestone] = useState('');
  const [addedMilestones, setAddedMilestones] = useState([]);
  const [updatedData, setUpdatedData] = useState(null);
  const [forceRender, setForceRender] = useState(false); 


  const deleteMilestone = (milestone) => {
    console.log(milestone)
    axios.delete(`http://localhost:8080/goals/${milestone.goalId}/milestone/${milestone.id}`);
    const updates = updatedData.filter((goal) => {
      console.log(goal.id, milestone.id);
      return goal.id !== milestone.id;
    });
    console.log(updates)
    setUpdatedData(updates)
  };

  const addMilestone = async () => {
    // console.log(updatedData)
    if (newMilestone.trim() !== '' && goalId) {
      const milestoneData = {
        id: Date.now(),
        text: newMilestone,
        completed: false,
      };
      console.log(newMilestone)
      try {
        const response = await axios.post(`http://localhost:8080/goals/${goalId}`, {
          updateText: newMilestone,
          "completed":true

        });

        const createdMilestone = response.data;

        onAddMilestone(createdMilestone);
        setNewMilestone('');

        
        setAddedMilestones((prevMilestones) => [...prevMilestones, createdMilestone]);

        const fetchDataResponse = await axios.get(`http://localhost:8080/goals/${goalId}`);
        setUpdatedData(fetchDataResponse?.data?.milestones);
      
        setForceRender((prev) => !prev); 
      } catch (error) {
        console.error('Error adding milestone:', error);
      }
    }
  };
  const fetchData = () => {
    axios
      .get(`http://localhost:8080/goals/${goalId}`)
      .then((fetchDataResponse) => {
        setUpdatedData(fetchDataResponse.data.milestones);
        console.log(fetchDataResponse.data, "bropp")
        
      })
      .catch((error) => {
        console.error('Error fetching milestones:', error);
      });
  };
  useEffect(() => {
   
  
      fetchData();
  }, []);
  
  useEffect(() => {
    
    console.log('Updated Data Changed:', updatedData);
  }, [updatedData]);

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
      {updatedData ? (
        <div className="mt-4">
          <p className="text-gray-500 mb-2"> Milestones:</p>
          <GoalUpdatesList deleteMilestone={deleteMilestone}     fetchData={fetchData} updates={updatedData} />
        </div>
      ): <div>no milestone</div> }
    </div>
  );
}

export default Milestones;
