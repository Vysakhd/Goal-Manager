import React from "react";

function GoalDetails(){
    return(
            <div className="fixed inset-0 flex items-center justify-center z-50 ">
              <div className="modal-container">
                <div className="bg-blue-100 rounded shadow-lg p-4  overflow-y-auto">
                  <h2 className="text-lg font-semibold mb-4">
                    {editGoalId !== null ? 'Edit Goal' : 'Add Goal'}
                  </h2>
                  
                  <input
                    type="text"
                    placeholder="Edit Your Goal"
                    className="w-full p-2 mb-2 border rounded"
                    value={newGoal}
                    onChange={(e) => setNewGoal(e.target.value)}
                  />
                 
                  <input
                    type="text"
                    placeholder="Edit Goal Description"
                    className="w-full p-2 mb-2 border rounded"
                    value={newGoalDescription}
                    onChange={(e) => setNewGoalDescription(e.target.value)}
                  />
                  <div className="flex space-x-2">
                    <input
                      type="date"
                      placeholder="Start Date"
                      className="w-1/2 p-2 border rounded"
                      value={newStartDate}
                      onChange={(e) => setNewStartDate(e.target.value)}
                    />
                    <input
                      type="date"
                      placeholder="End Date"
                      className="w-1/2 p-2 border rounded"
                      value={newEndDate}
                      onChange={(e) => setNewEndDate(e.target.value)}
                    />
                  </div>
                  <div className="flex justify-end">
                    <button
                      onClick={saveGoal}
                      className="bg-blue-500 text-white p-2 rounded-md mr-2 mt-[3px]"
                    >
                      Save
                    </button>
                    <button
                      onClick={closeModal}
                      className="bg-red-500 text-white p-2 rounded-md mt-[3px]"
                    >
                      Cancel
                    </button>
                    {editGoalId !== null && (
                      <button
                        onClick={() => deleteGoal(editGoalId)}
                        className="text-white ml-2 bg-red-500 p-2 rounded-md mt-[3px]"
                      >
                        Delete
                      </button>
                    )}
                  </div>
    
                 
                  <div className="mt-8">
                    <h2 className="text-lg font-semibold mb-4">Milestones</h2>
                    <Milestones
                    editGoalId={editGoalId}
                      milestones={milestones}
                      onAddMilestone={addMilestone}
                      onToggleMilestone={toggleMilestone}
                  
                    />
                  </div>
                </div>
              </div>
            </div>
          
)}
  export default GoalDetails
             

                