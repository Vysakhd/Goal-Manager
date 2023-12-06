
import React from 'react';
import GoalItem from './GoalItem';

function GoalList({ goals, onDelete, onEdit, updateProgress }) {
  console.log(goals)
  return (
    <div className="mt-[4px] flex gap-3 flex-wrap">
      {goals.map((goal) => (
        <div className="w-[400px] p-8 rounded-xl bg-[url('https://www.lystloc.com/blog/wp-content/uploads/2022/12/ezgif.com-gif-maker-52.webp')]">      
            <GoalItem key={goal.id} goal={goal} onDelete={onDelete} onEdit={onEdit} updateProgress={updateProgress} />
        </div> 
       ))
      }
    </div>
  );
}

export default GoalList;


