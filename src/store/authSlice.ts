import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { authService, type LoginInput, type User } from '../api/authService';

type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
};

const initialState: AuthState = { user: null, isAuthenticated: false, isLoading: false, error: null };

const message = (e: unknown) => (e instanceof Error ? e.message : 'Something went wrong');

export const login = createAsyncThunk('auth/login', (input: LoginInput, { rejectWithValue }) =>
  authService.login(input).catch((e: unknown) => rejectWithValue(message(e))),
);

// Rebuilds the session from the httpOnly cookie after a page reload.
export const restoreSession = createAsyncThunk(
  'auth/restoreSession',
  (_: void, { rejectWithValue }) => authService.me().catch(() => rejectWithValue(null)),
  { condition: (_, { getState }) => !(getState() as { auth: AuthState }).auth.isAuthenticated },
);

// Clear local state even if the server call fails; cookies expire on their own.
export const logout = createAsyncThunk('auth/logout', () => authService.logout().catch(() => undefined));

const signedIn = (state: AuthState, user: User) => {
  state.user = user;
  state.isAuthenticated = true;
  state.isLoading = false;
  state.error = null;
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (b) => {
    b.addCase(login.pending, (s) => {
      s.isLoading = true;
      s.error = null;
    })
      .addCase(login.fulfilled, (s, a) => signedIn(s, a.payload))
      .addCase(login.rejected, (s, a) => {
        s.isLoading = false;
        s.error = (a.payload as string | undefined) ?? message(a.error);
      })
      .addCase(restoreSession.pending, (s) => {
        s.isLoading = true;
      })
      .addCase(restoreSession.fulfilled, (s, a) => signedIn(s, a.payload))
      .addCase(restoreSession.rejected, () => initialState)
      .addCase(logout.fulfilled, () => initialState);
  },
});

export default authSlice.reducer;
