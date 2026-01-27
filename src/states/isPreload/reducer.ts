import { createSlice } from '@reduxjs/toolkit';
import { asyncPreloadProcess } from './action';

const isPreloadSlice = createSlice({
  name: 'isPreload',
  initialState: true,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(asyncPreloadProcess.fulfilled, () => false);
  },
});

export default isPreloadSlice.reducer;
