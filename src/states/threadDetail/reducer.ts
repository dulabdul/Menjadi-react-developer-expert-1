import { createSlice } from '@reduxjs/toolkit';

const threadDetailSlice = createSlice({
  name: 'threadDetail',
  initialState: null as any,
  reducers: {
    receiveThreadDetail(state, action) {
      return action.payload;
    },
    addComment(state, action) {
      return {
        ...state,
        comments: [action.payload, ...state.comments],
      };
    },
    toggleVoteComment(state, action) {
      const { commentId, voteType, userId } = action.payload;
      return {
        ...state,
        comments: state.comments.map((comment: any) => {
          if (comment.id === commentId) {
            return {
              ...comment,
              upVotesBy:
                voteType === 1
                  ? [...new Set([...comment.upVotesBy, userId])]
                  : comment.upVotesBy.filter((id: string) => id !== userId),
              downVotesBy:
                voteType === -1
                  ? [...new Set([...comment.downVotesBy, userId])]
                  : comment.downVotesBy.filter((id: string) => id !== userId),
            };
          }
          return comment;
        }),
      };
    },
  },
});

export const { receiveThreadDetail, addComment, toggleVoteComment } =
  threadDetailSlice.actions;
export default threadDetailSlice.reducer;
