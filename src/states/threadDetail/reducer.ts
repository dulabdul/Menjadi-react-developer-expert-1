import { createSlice } from '@reduxjs/toolkit';

const threadDetailSlice = createSlice({
  name: 'threadDetail',
  initialState: null,
  reducers: {
    receiveThreadDetail(state, action) {
      return action.payload;
    },
    clearThreadDetail() {
      return null;
    },
    addComment(state: any, action) {
      return { ...state, comments: [action.payload, ...state.comments] };
    },
  },
});

export const { receiveThreadDetail, clearThreadDetail, addComment } = threadDetailSlice.actions;
export default threadDetailSlice.reducer;
