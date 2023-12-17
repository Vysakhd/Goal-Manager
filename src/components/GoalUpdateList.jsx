import React, { useState, useEffect } from "react";

import Graph from "../pages/Graph";
import { useDispatch, useSelector } from "react-redux";

import { updateMilestone } from "../goalsSlice";


const GoalUpdatesList = ({ deleteMilestone, fetchData, goalId }) => {
  const dispatch = useDispatch();
  const updates = useSelector((state) => state.milestone.milestones);
  const deleteMiles = (milestone) => {
    deleteMilestone(milestone);
  };

  const [updateList, setUpdateList] = useState(null);

  const handleCheckboxClick = (event, milestoneId, goalId, updateText) => {
    const updateMilestoneData = {
      updateText: updateText,
      completed: event.target.checked,
    };
    const updateMilestoneResponse = dispatch(
      updateMilestone({ goalId, milestoneId, updateMilestoneData })
    );
    if (updateMilestoneResponse) {
      console.log('Calling');
      dispatch(fetchMilestonesAsync(goalId));
    }
  };

  return (
    <div>
      <ul className="list-disc pl-6">
        {updates.map((update) => {
          return (
            <li key={update.id} className="mb-2">
              <input
                type="checkbox"
                onChange={(event) =>
                  handleCheckboxClick(
                    event,
                    update.id,
                    update.goalId,
                    update.updateText
                  )
                }
                className="mr-2"
                checked={update.completed}
              />
              {update.updateText}
              <button
                onClick={() => deleteMiles(update)}
                className="ml-2 bg-red-500 text-white p-2 rounded-md hover:bg-red-600"
              >
                Delete
              </button>
            </li>
          );
        })}
      </ul>
      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-4">Progress Chart</h2>
        <Graph updateList={updates} />
      </div>
    </div>
  );
};

export default GoalUpdatesList;

// import React, { useState, useEffect } from 'react';
// import Graph from '../pages/Graph';
// import { useDispatch, useSelector } from 'react-redux';
// import { handleCheckbox } from '../milestoneSlice';

// const GoalUpdatesList = ({ deleteMilestone, fetchData, updates }) => {
//   const dispatch = useDispatch();

//   const deleteMiles = (milestone) => {
//     deleteMilestone(milestone);
//   };

//   const handleCheckboxClick = (milestoneId) => {
//     dispatch(handleCheckbox(milestoneId));
//   };

//   return (
//     <div>
//       <ul className="list-disc pl-6">
//         {updates.map((update) => (
//           <li key={update.id} className="mb-2">
//             <input
//               type="checkbox"
//               onChange={() => handleCheckboxClick(update.id)}
//               className="mr-2"
//             />
//             {update.updateText}
//             <button
//               onClick={() => deleteMiles(update)}
//               className="ml-2 bg-red-500 text-white p-2 rounded-md hover:bg-red-600"
//             >
//               Delete
//             </button>
//           </li>
//         ))}
//       </ul>
//       <div className="mt-8">
//         <h2 className="text-lg font-semibold mb-4">Progress Chart</h2>
//         <Graph data={updates} />
//       </div>
//     </div>
//   );
// };

// export default GoalUpdatesList;
