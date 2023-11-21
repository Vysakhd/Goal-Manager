
import React from 'react';
import GoalItem from './GoalItem';

function GoalList({ goals, onDelete, onEdit, updateProgress }) {
  console.log(goals)
  return (
    <div className="mt-[4px] flex gap-3 flex-wrap">
      {goals.map((goal) => (
<div className=' w-[400px] bg-red-100 pl-8'>        <GoalItem key={goal.id} goal={goal} onDelete={onDelete} onEdit={onEdit} updateProgress={updateProgress} />
</div>      ))}
    </div>
  );
}

export default GoalList;


