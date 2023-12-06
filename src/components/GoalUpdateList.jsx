import React, { useState, useEffect } from 'react';

import Graph from '../pages/Graph';

const GoalUpdatesList = ({ updates, onDeleteMilestone }) => {
  const [updateList, setUpdateList] = useState(updates);
  const [count , setCount] = useState(0)

  const handleCheckboxChange = (updateId) => {
    const updatedList = updateList.map((update) =>
      update.id === updateId ? { ...update, completed: !update.completed } : update
    );
    setUpdateList(updatedList);
    setCount(1)
  };

  useEffect(() => {
    
    console.log('updateList changed:', updateList);
  }, [updateList]);
  useEffect(() => {
    console.log('GoalUpdatesList re-rendered');
  }, [updates]);
  

  return (
    <div>
      <ul className="list-disc pl-6">
        {updates.map((update) => (
          <li key={update.id} className="mb-2">
            <input
              type="checkbox"
            
              onChange={() => handleCheckboxChange(update.id)}
              className="mr-2"
            />
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
      <div className="mt-8">
  <h2 className="text-lg font-semibold mb-4">Progress Chart</h2>
  <Graph updateList={updateList} />
</div>

    </div>
  );
};

export default GoalUpdatesList;
