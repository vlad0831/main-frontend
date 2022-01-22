import { combineReducers, configureStore } from '@reduxjs/toolkit';

import onboardingReducer from './slices/onboardingSlice';
import dashboardReducer from './slices/dashboardSlice';

const store = configureStore({
  reducer: combineReducers({
    onboarding: onboardingReducer,
    dashboard: dashboardReducer,
  }),
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
