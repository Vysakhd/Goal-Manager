
import React from 'react';
import GoalItem from './GoalItem';

function GoalList({ goals, onDelete, onEdit, updateProgress }) {
  return (
    <div className="mt-[4px]">
      {goals.map((goal) => (
        <GoalItem key={goal.id} goal={goal} onDelete={onDelete} onEdit={onEdit} updateProgress={updateProgress} />
      ))}
    </div>
  );
}

export default GoalList;

