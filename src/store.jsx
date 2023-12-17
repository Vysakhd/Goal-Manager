
import { configureStore } from '@reduxjs/toolkit';
import goalsSLice from './goalsSlice';
import milestoneSlice from './milestoneSlice';
import goalSlice from './goalSlice';
const store = configureStore({
  reducer: {
    goal: goalSlice,
    goals: goalsSLice,
    milestone: milestoneSlice,
  },
});

export default store;
