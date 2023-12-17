import React, { useState, useEffect } from "react";
import Milestones from "../components/Milestones";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchGoalById, updateGoal, addGoal, deleteGoal } from "../goalSlice";

function GoalDetails() {
  const dispatch = useDispatch();
  const { id: goalId } = useParams();
  const goal = useSelector((state) => state.goal.goal);
  const milestones = useSelector((state) => state.goal.milestones);
  // console.log(goal, milestones);
  const [newGoal, setNewGoal] = useState("");
  const [newGoalDescription, setNewGoalDescription] = useState("");
  const [newStartDate, setNewStartDate] = useState("");
  const [newEndDate, setNewEndDate] = useState("");
  const [goals, setGoal] = useState([]);
  const [newMilestones, setNewMilestones] = useState("");
  // console.log(goal, milestones);

  useEffect(() => {
    if (goalId) {
      dispatch(fetchGoalById(goalId));
    }
  }, [dispatch, goalId]);

  useEffect(() => {
    // setGoal(goal);
    // console.log(goal);
    if (goal) {
      setNewGoal(goal.title);
      setNewGoalDescription(goal.description);
      setNewStartDate(goal.startDate);
      setNewEndDate(goal.endDate);
      setNewMilestones(goal.milestones);
    }
  }, [goal]);

  const addMilestone = (milestone) => {
    setNewMilestones((prevMilestones) => [...prevMilestones, milestone]);
  };

  const toggleMilestone = (milestoneId) => {
    setNewMilestones((prevMilestones) =>
      prevMilestones.map((milestone) =>
        milestone.id === milestoneId
          ? { ...milestone, completed: !milestone.completed }
          : milestone
      )
    );
  };

  const handleDeleteGoal = (goalId) => {
    dispatch(deleteGoal(goalId));
  };

  const saveGoal = () => {
    const goalData = {
      id: goalId,
      title: newGoal,
      milestones,
    };

    if (goalId) {
      const editGoalData = {
        title: newGoal,
        description: newGoalDescription,
        startDate: newStartDate,
        endDate: newEndDate,
      };

      // const editMilestoneData = {
      //   completed:
      // }
      if (!newGoal) {
        alert("Enter the title");
      } else if (!newGoalDescription) {
        alert("Enter the description");
      } else if (!newStartDate) {
        alert("Enter the start date");
      } else if (!newEndDate) {
        alert("Enter the  end date");
      } else {
        const updateGoalResponse = dispatch(
          updateGoal({ goalId, goalData: editGoalData })
        );
        if (updateGoalResponse) {
          dispatch(fetchGoalById(goalId));
        }
      }
    } else {
      console.log("Calling htis nsidnuf");
      dispatch(addGoal(goalData));
    }
    setNewGoal("");
    setNewGoalDescription("");
    setNewStartDate("");
    setNewEndDate("");
    setNewMilestones([]);
  };

  return (
    <div>
      <div className="modal-container">
        <div className=" rounded shadow-lg p-4  overflow-y-auto">
          <h2 className="text-lg font-semibold mb-4">
            {goalId !== null ? "Edit Goal" : "Add Goal"}
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
            {goalId !== null && (
              <button
                onClick={() => handleDeleteGoal(goalId)}
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
  );
}
export default GoalDetails;
