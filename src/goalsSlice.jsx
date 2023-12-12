// goalsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the async thunk for fetching goals
export const fetchGoals = createAsyncThunk('goals/fetchGoals', async (pageNumber) => {
  const response = await axios.get(`http://localhost:8080/goals?page=${pageNumber}&size=6`);
  return response.data;
});

// Define the async thunk for adding a goal
export const addGoal = createAsyncThunk('goals/addGoal', async (goalData) => {
  const response = await axios.post('http://localhost:8080/goals', goalData);
  return response.data;
});

// Define the initial state and reducers
const goalsSlice = createSlice({
  name: 'goals',
  initialState: { goals: [], status: 'idle', error: null },
  reducers: {
    // Add your other reducers here if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGoals.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchGoals.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.goals = action.payload;
      })
      .addCase(fetchGoals.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addGoal.fulfilled, (state, action) => {
        state.status = 'succeeded';
        if(state.goals.length<6){
            state.goals.push(action.payload);

        }
    })
      .addCase(addGoal.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default goalsSlice.reducer;
export const { } = goalsSlice.actions; // Add other actions if needed
