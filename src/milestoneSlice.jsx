import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchMilestonesAsync = createAsyncThunk('milestone/fetchMilestones', async (goalId) => {
  const response = await axios.get(`http://localhost:8080/goals/${goalId}`);
  console.log(response.data.milestones)

  return response.data.milestones;
});

export const addMilestoneAsync = createAsyncThunk('milestone/addMilestone', async ({ goalId, newMilestone }) => {
  const response = await axios.post(`http://localhost:8080/goals/${goalId}`, {
    updateText: newMilestone,
    completed: false,
  });
  return response.data;
});

export const deleteMilestoneAsync = createAsyncThunk('milestone/deleteMilestone', async ({ goalId, milestoneId }) => {
  await axios.delete(`http://localhost:8080/goals/${goalId}/milestone/${milestoneId}`);

  return milestoneId;
});
export const completeMilestone = (state, action) => {
    const milestoneId = action.payload;
    const updatedMilestones = state.milestones.map((milestone) => {
      if (milestone.id === milestoneId) {
        return { ...milestone, completed: true };
      }
      return milestone;
    });
    state.milestones = updatedMilestones;
  };


const milestoneSlice = createSlice({
  name: 'milestone',
  initialState: {
    milestones: [],
  },
  reducers: {
    handleCheckbox: completeMilestone,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMilestonesAsync.fulfilled, (state, action) => {
        state.milestones = action.payload;
      })
      .addCase(addMilestoneAsync.fulfilled, (state, action) => {
        state.milestones.push(action.payload);
      })
      .addCase(deleteMilestoneAsync.fulfilled, (state, action) => {
        state.milestones = state.milestones.filter((milestone) => milestone.id !== action.payload);
      });
  },
});

export const { handleCheckbox } = milestoneSlice.actions;
export default milestoneSlice.reducer;
