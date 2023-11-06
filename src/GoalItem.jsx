// import React from 'react';

// function GoalItem({ goal, onDelete, onEdit }) {
//   return (
//     <div className="flex-col items-center justify-between p-[2px] border-b w-[600px] text-left">
//       <div className='text-[25px]'>{goal.text}</div>
//       <div>{goal.description}</div>
//       <div>
//         <button onClick={() => onEdit(goal.id)} className="text-blue-500 mr-[2px]">
//           Edit
//         </button>
//         <button  onClick={() => onDelete(goal.id)} className="text-red-500 ml-[5px]">
//           Delete
//         </button>
//       </div>
//     </div>
//   );
// }

// export default GoalItem;




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
    <div className="flex-col items-center justify-between p-[2px] border-b w-[600px]">
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
      <div>
        <button onClick={() => onEdit(goal.id)} className="text-blue-500 mr-[2px]">
          Edit
        </button>
        <button onClick={() => onDelete(goal.id)} className="text-red-500 ml-[5px]">
          Delete
        </button>
      </div>
    </div>
  );
}

export default GoalItem;

