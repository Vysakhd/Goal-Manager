import GoalUpdatesList from "./GoalUpdateList";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMilestonesAsync,
  addMilestoneAsync,
  deleteMilestoneAsync,
} from "../milestoneSlice";

function Milestones({ goalId, onAddMilestone }) {
  const dispatch = useDispatch();
  const updatedData = useSelector((state) => state.milestone.milestones);
  const [newMilestone, setNewMilestone] = useState("");

  useEffect(() => {
    dispatch(fetchMilestonesAsync(goalId));
  }, [dispatch, goalId]);

  const deleteMilestone = (milestone) => {
    dispatch(
      deleteMilestoneAsync({
        goalId: milestone.goalId,
        milestoneId: milestone.id,
      })
    );
  };

  const addMilestone = async () => {
    if (newMilestone.trim() !== "" && goalId) {
      try {
        await dispatch(addMilestoneAsync({ goalId, newMilestone }));
        setNewMilestone("");
      } catch (error) {
        console.error("Error adding milestone:", error);
      }
    }
  };

  return (
    <div >
      <div className="flex space-x-2 mb-4">
        <input
          type="text"
          placeholder="Add Milestone"
          className="w-2/3 p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
          value={newMilestone}
          onChange={(e) => setNewMilestone(e.target.value)}
        />
        <button
          onClick={addMilestone}
          className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
        >
          Add
        </button>
      </div>
      {updatedData ? (
        <div className="mt-4">
          <p className="text-gray-500 mb-2"> Milestones:</p>
          <GoalUpdatesList
            deleteMilestone={deleteMilestone}
            fetchData={fetchMilestonesAsync}
            updates={updatedData}
            goalId={goalId}
          />
        </div>
      ) : (
        <div>no milestone</div>
      )}
    </div>
  );
}

export default Milestones;
