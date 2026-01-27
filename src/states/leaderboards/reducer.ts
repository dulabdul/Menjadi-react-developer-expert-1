import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api';

export const asyncReceiveLeaderboards = createAsyncThunk(
  'leaderboards/receive',
  async () => {
    const leaderboards = await api.getLeaderboards();
    return leaderboards;
  },
);

const leaderboardsSlice = createSlice({
  name: 'leaderboards',
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(asyncReceiveLeaderboards.fulfilled, (state, action) => action.payload);
  },
});

export default leaderboardsSlice.reducer;
