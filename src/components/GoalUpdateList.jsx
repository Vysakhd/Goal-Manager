// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Graph from '../pages/Graph';

// const GoalUpdatesList = ({ updates }) => {
  
//   const deleteMilestone = (milestone) => {
//     // console.log(`http://localhost:8080/goals/${milestone.goalId}/milestone/${milestone.id}`)
//     axios
//       .delete(`http://localhost:8080/goals/${milestone.goalId}/milestone/${milestone.id}`)

//   };
  

//   const [updateList, setUpdateList] = useState(updates);
//   const [count , setCount] = useState(0)
// console.log(updateList)
//   const handleCheckboxChange = (updateId) => {
//     const updatedList = updateList.map((update) =>
//       update.id === updateId ? { ...update, completed: !update.completed } : updates
//     );
//     setUpdateList(updatedList);
//     setCount(1)
//   };

//   useEffect(() => {
    
//     console.log('updateList changed:', updateList);
//   }, [updateList]);
//   useEffect(() => {
//     console.log('GoalUpdatesList re-rendered');
//   }, [updates]);
  

//   return (
//     <div>
//       <ul className="list-disc pl-6">
//         {updates.map((update) => (
//           <li key={update.id} className="mb-2">
//             <input
//               type="checkbox"
            
//               onChange={() => handleCheckboxChange(update.id)}
//               className="mr-2"
//             />
//             {update.updateText}
//             <button
//   onClick={() => deleteMilestone(update)}
//   className="ml-2 bg-red-500 text-white p-2 rounded-md hover:bg-red-600"
// >
//   Delete
// </button>

//           </li>
//         ))}
//       </ul>
//       <div className="mt-8">
//   <h2 className="text-lg font-semibold mb-4">Progress Chart</h2>
//   <Graph updateList={updateList} />
// </div>

//     </div>
//   );
// };

// export default GoalUpdatesList;




import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Graph from '../pages/Graph';

const GoalUpdatesList = ({ updates }) => {
  const deleteMilestone = (milestone) => {
    axios.delete(`http://localhost:8080/goals/${milestone.goalId}/milestone/${milestone.id}`);
  };

  const [updateList, setUpdateList] = useState(updates);

  const handleCheckboxChange = (updateId) => {
    setUpdateList((prevUpdateList) =>
      prevUpdateList.map((update) =>
        update.id === updateId ? { ...update, completed: !update.completed } : update
      )
    );
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
        {updateList.map((update) => (
          <li key={update.id} className="mb-2">
            <input
              type="checkbox"
              onChange={() => handleCheckboxChange(update.id)}
              className="mr-2"
            />
            {update.updateText}
            <button
              onClick={() => deleteMilestone(update)}
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

