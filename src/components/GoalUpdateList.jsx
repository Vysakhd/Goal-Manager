import React, { useState, useEffect } from 'react';

import Graph from '../pages/Graph';
import { useDispatch, useSelector } from 'react-redux';
import { handleCheckbox } from '../milestoneSlice'; 


const GoalUpdatesList = ({deleteMilestone,fetchData }) => {
  const dispatch = useDispatch();
  const updates = useSelector((state) => state.milestone.milestones);
console.log(updates)
  const deleteMiles = (milestone) => {
    deleteMilestone(milestone)
  };

  const [updateList, setUpdateList] = useState(null);
  

  console.log(updateList)

  const handleCheckboxClick = (milestoneId) => {
    dispatch(handleCheckbox(milestoneId));
  };
  console.log(updates)
  
  return (
    <div>
      <ul className="list-disc pl-6">
        {updates.map((update) => (
          <li key={update.id} className="mb-2">
            <input
              type="checkbox"
              onChange={() => handleCheckboxClick(update.id)}
              className="mr-2"
            />
            {update.updateText}
            <button
              onClick={() => deleteMiles(update)}
              className="ml-2 bg-red-500 text-white p-2 rounded-md hover:bg-red-600"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-4">Progress Chart</h2>
        <Graph updateList={updates} />
      </div>
    </div>
  );
};

export default GoalUpdatesList;

