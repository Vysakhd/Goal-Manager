
import { configureStore } from '@reduxjs/toolkit';
import goalsReducer from './goalsSlice';
import milestoneReducer from './milestoneSlice';

const store = configureStore({
  reducer: {
    goals: goalsReducer,
    milestone: milestoneReducer,
  },
});

export default store;
