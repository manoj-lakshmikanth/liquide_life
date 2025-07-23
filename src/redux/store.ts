import { configureStore } from '@reduxjs/toolkit';
import orderReducer from './slices/orderSlice';
import holdingReducer from './slices/holdingSlice';

export const store = configureStore({
  reducer: {
    orders: orderReducer,
    holdings: holdingReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
