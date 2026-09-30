import { configureStore, type UnknownAction } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';

import auth from './authSlice';

export const store = configureStore({
  reducer: { auth },
  devTools: import.meta.env.DEV && {
    // createAsyncThunk puts the thunk argument in `meta.arg`; for login that is the password.
    actionSanitizer: <A extends UnknownAction>(action: A): A =>
      action.type.startsWith('auth/login') ? { ...action, meta: '<redacted>' } : action,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
