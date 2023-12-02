import { createSlice } from "@reduxjs/toolkit";
import { TDataResponse, handleLogin } from "./handler";

export interface AuthState {
  auth: TDataResponse | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  auth: null,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authLogout: (state) => {
      state.error = null;
      state.auth = null;
    },
    refreshToken: (state, { payload }) => {
      if (state.auth && payload.accessToken) {
        state.auth.accessToken = payload.accessToken;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(handleLogin.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(handleLogin.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.auth = action.payload;
    });
    builder.addCase(handleLogin.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message as string;
      state.auth = null;
    });
  },
});
export const { refreshToken, authLogout } = authSlice.actions;
export default authSlice.reducer;
