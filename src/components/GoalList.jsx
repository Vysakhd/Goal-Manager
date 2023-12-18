import React from 'react';
import { Link } from 'react-router-dom';
import GoalItem from './GoalItem';



function GoalList({ goals, onEdit, updateProgress }) {
  return (
    <div className="mt-[4px] flex gap-3 flex-wrap ">
      {goals.map((goal) => (
        <div className="w-[400px] p-8 rounded-xl bg-[url('https://www.lystloc.com/blog/wp-content/uploads/2022/12/ezgif.com-gif-maker-52.webp')]">
         
          <Link to={`/details/${goal.id}`} key={goal.id}>
            <GoalItem goal={goal}  onEdit={onEdit} updateProgress={updateProgress} />
          </Link>
          
        </div>
      ))}
    </div>
  );
}

export default GoalList;




