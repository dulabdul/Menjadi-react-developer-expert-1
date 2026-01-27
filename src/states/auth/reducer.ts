import { createSlice } from '@reduxjs/toolkit';
import { asyncSetAuthUser, asyncUnsetAuthUser } from './action';

const authUserSlice = createSlice({
  name: 'authUser',
  initialState: null,
  reducers: {
    setAuthUser(state, action) {
      return action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(asyncSetAuthUser.fulfilled, (state, action) => action.payload)
      .addCase(asyncUnsetAuthUser.fulfilled, () => null);
  },
});

export const { setAuthUser } = authUserSlice.actions;
export default authUserSlice.reducer;
