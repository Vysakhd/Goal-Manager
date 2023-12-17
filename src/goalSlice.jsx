
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchGoalById = createAsyncThunk(
  "goal/fetchGoalById",
  async (goalId) => {
    const response = await axios.get(`http://localhost:8080/goals/${goalId}`);
    return response.data;
  }
);

export const updateGoal = createAsyncThunk(
  "goal/updateGoal",
  async ({ goalId, goalData }) => {
    const response = await axios.put(
      `http://localhost:8080/goals/${goalId}`,
      goalData
    );
    return response.data;
  }
);

export const addGoal = createAsyncThunk("goal/addGoal", async (newGoalData) => {
  const response = await axios.post("http://localhost:8080/goals", newGoalData);
  return response.data;
});

export const deleteGoal = createAsyncThunk(
  "goal/deleteGoal",
  async (goalId) => {
    const response = await axios.delete(
      `http://localhost:8080/goals/${goalId}`
    );
    return response.data;
  }
);

export const goalSlice = createSlice({
  name: "goal",
  initialState: { goal: null, milestones: [] },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGoalById.fulfilled, (state, action) => {
        state.goal = action.payload;
        state.milestones = action.payload.milestones;
      
      })
      .addCase(updateGoal.fulfilled, (state, action) => {
        state.goal = action.payload;
      })
      .addCase(addGoal.fulfilled, (state, action) => {
        state.goal = action.payload;
      })
      .addCase(deleteGoal.fulfilled, (state, action) => {
        state.goal = null;
        state.milestones = [];
      });
  },
});

export default goalSlice.reducer;
