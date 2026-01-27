import { createSlice } from '@reduxjs/toolkit';

const threadsSlice = createSlice({
  name: 'threads',
  initialState: [] as any[],
  reducers: {
    receiveThreads(state, action) {
      return action.payload;
    },
    addThread(state: any, action) {
      return [action.payload, ...state];
    },
    toggleVoteThread(state: any, action) {
      const { threadId, userId, voteType } = action.payload;
      return state.map((thread: any) => {
        if (thread.id === threadId) {
          return {
            ...thread,
            upVotesBy:
              voteType === 1
                ? [...new Set([...thread.upVotesBy, userId])]
                : thread.upVotesBy.filter((id: string) => id !== userId),
            downVotesBy:
              voteType === -1
                ? [...new Set([...thread.downVotesBy, userId])]
                : thread.downVotesBy.filter((id: string) => id !== userId),
          };
        }
        return thread;
      });
    },
  },
});

export const { receiveThreads, addThread, toggleVoteThread } =
  threadsSlice.actions;
export default threadsSlice.reducer;
