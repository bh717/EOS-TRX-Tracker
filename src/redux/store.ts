import { configureStore } from '@reduxjs/toolkit';
import filterSlice from './slices/filterSlice';
import historySlice from './slices/historySlice';

export const store = configureStore({
  reducer: { history: historySlice, filter: filterSlice },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
