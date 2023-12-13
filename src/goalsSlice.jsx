
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const fetchGoals = createAsyncThunk('goals/fetchGoals', async (pageNumber) => {
  const response = await axios.get(`http://localhost:8080/goals?page=${pageNumber}&size=6`);
  return response.data;
});


export const addGoal = createAsyncThunk('goals/addGoal', async (goalData) => {
  const response = await axios.post('http://localhost:8080/goals', goalData);
  return response.data;
});


const goalsSlice = createSlice({
  name: 'goals',
  initialState: { goals: [], status: 'idle', error: null },
  reducers: {
    
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
export const { } = goalsSlice.actions; 
