import React, { useState,useEffect } from "react";
import Milestones from '../components/Milestones'; // Import the Milestones component
import axios from 'axios';
import { useParams } from "react-router-dom";

function GoalDetails() {
  // Define your state variables using useState
  const [newGoal, setNewGoal] = useState("");
  const [newGoalDescription, setNewGoalDescription] = useState("");
  const [newStartDate, setNewStartDate] = useState("");
  const [newEndDate, setNewEndDate] = useState("");
  const [editGoalId, setEditGoalId] = useState(null);
  const [milestones, setMilestones] = useState([]);
  const [goals, setGoal] = useState([]); // Assuming you have goals state


  const params = useParams(); // Assuming your route includes a parameter for goal id
const goalId = params.id

  useEffect(() => {
    // Fetch goal details when the component mounts
    if (goalId) {
      axios.get(`http://localhost:8080/goals/${goalId}`)
        .then((response) => {
          console.log(response)

          setGoal(response.data);
          setNewGoal(response.data.title);
          setNewGoalDescription(response.data.description);
          setNewStartDate(response.data.startDate);
          setNewEndDate(response.data.endDate);
          setMilestones(response.data.milestones);
        })
        .catch((error) => {
          console.error('Error fetching goal details:', error);
        });
    }
  }, [goalId]);


  const addMilestone = (milestone) => {
    setMilestones((prevMilestones) => [...prevMilestones, milestone]);
  };

  const toggleMilestone = (milestoneId) => {
    setMilestones((prevMilestones) =>
      prevMilestones.map((milestone) =>
        milestone.id === milestoneId
          ? { ...milestone, completed: !milestone.completed }
          : milestone
      )
    );
  };

  const deleteGoal = () => {
    axios.delete(`http://localhost:8080/goals/${goalId}`)
      .then((response) => {
        console.log('Goal deleted successfully:', response.data);
        // Redirect to another page or handle navigation as needed
      })
      .catch((error) => {
        console.error('Error deleting goal:', error);
      });
  };


  const saveGoal = () => {
    if (newGoal.trim() !== '') {
      if (editGoalId !== null) {
        const updatedGoal = {
          title: newGoal,
          description: newGoalDescription,
          startDate: newStartDate,
          endDate: newEndDate,
          milestones: milestones,
        };

        axios.put(`http://localhost:8080/goals/${editGoalId}`, updatedGoal)
          .then((response) => {
            console.log('Goal updated successfully:', response.data);
            setGoals((prevGoals) =>
              prevGoals.map((goal) =>
                goal.id === editGoalId
                  ? {
                      ...goal,
                      title: newGoal,
                      description: newGoalDescription,
                      startDate: newStartDate,
                      endDate: newEndDate,
                      milestones: milestones,
                    }
                  : goal
              )
            );
            // closeModal();
          })
          .catch((error) => {
            console.error('Error updating goal:', error);
          });
      } else {
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
            setGoals([
              ...goals,
              {
                id: response.data.id, 
                title: newGoal,
                description: newGoalDescription,
                progress: 0,
                startDate: newStartDate,
                endDate: newEndDate,
                milestones: milestones,
              },
            ]);
            setNewGoal('');
            setNewGoalDescription('');
            setNewStartDate('');
            setNewEndDate('');
            setMilestones([]);
            // closeModal();
          })
          .catch((error) => {
            console.error('Error adding goal:', error);
          });
      }
    }
  };
    return(
            <div className="fixed inset-0 flex items-center justify-center z-50 ">
              <div className="modal-container">
                <div className="bg-blue-100 rounded shadow-lg p-4  overflow-y-auto">
                  <h2 className="text-lg font-semibold mb-4">
                    {editGoalId !== null ? 'Edit Goal' : 'Add Goal'}
                  </h2>
                  
                  <input
                    type="text"
                    placeholder="Edit Your Goal"
                    className="w-full p-2 mb-2 border rounded"
                    value={newGoal}
                    onChange={(e) => setNewGoal(e.target.value)}
                  />
                 
                  <input
                    type="text"
                    placeholder="Edit Goal Description"
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
                      className="bg-blue-500 text-white p-2 rounded-md mr-2 mt-[3px]"
                    >
                      Save
                    </button>
                    <button
                      // onClick={closeModal}
                      className="bg-red-500 text-white p-2 rounded-md mt-[3px]"
                    >
                      Cancel
                    </button>
                    {editGoalId !== null && (
                      <button
                        onClick={() => deleteGoal(editGoalId)}
                        className="text-white ml-2 bg-red-500 p-2 rounded-md mt-[3px]"
                      >
                        Delete
                      </button>
                    )}
                  </div>
    
                 
                  <div className="mt-8">
                    <h2 className="text-lg font-semibold mb-4">Milestones</h2>
                    <Milestones
                    goalId={goalId}
                      milestones={milestones}
                      onAddMilestone={addMilestone}
                      onToggleMilestone={toggleMilestone}
                  
                    />
                  </div>
                </div>
              </div>
            </div>
          
)}
  export default GoalDetails
             

                