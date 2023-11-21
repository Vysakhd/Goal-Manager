
import React, { useState } from 'react';

function GoalItem({ goal, onDelete, onEdit, updateProgress }) {
  const [isEditingProgress, setIsEditingProgress] = useState(false);
  const [newProgress, setNewProgress] = useState(goal.progress);

  const handleEditProgress = () => {
    setIsEditingProgress(true);
  };

  const handleSaveProgress = () => {
    setIsEditingProgress(false);
    updateProgress(goal.id, newProgress);
  };

  return (
    <div onClick={() => onEdit(goal.id)} className="cursor-pointer py-10 items-center justify-between p-[2px] border-b w-[600px]">
      <div >
        <div className='text-[35px]'>{goal.title}</div>
        <div className='text-[25px]'>{goal.text}</div>
        <div className='mt-[px]'>{goal.description}</div>
        {isEditingProgress ? (
          <div>
            <input
              type="number"
              value={newProgress}
              onChange={(e) => setNewProgress(parseInt(e.target.value))}
            />
            <button onClick={handleSaveProgress}>Save</button>
          </div>
        ) : (
          <div>
            <div>Progress: {goal.progress}%</div>
            <button onClick={handleEditProgress}>Edit Progress</button>
          </div>
        )}
        <div className='mt-8'></div>
      </div>
     
    </div>
  );
}

export default GoalItem;
GoalItem.jsx



