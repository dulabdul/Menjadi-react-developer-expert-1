import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api';
import {
  receiveThreadDetail,
  addComment,
  toggleVoteComment,
  toggleVoteThreadDetail,
} from './reducer';

export const asyncReceiveThreadDetail = createAsyncThunk(
  'threadDetail/receive',
  async (threadId: string, { dispatch }) => {
    dispatch(receiveThreadDetail(null));
    try {
      const threadDetail = await api.getThreadDetail(threadId);
      dispatch(receiveThreadDetail(threadDetail));
    } catch (error: any) {
      alert(error.message);
    }
  },
);

export const asyncAddComment = createAsyncThunk(
  'threadDetail/addComment',
  async ({ content, threadId }: any, { dispatch }) => {
    try {
      const comment = await api.createComment({ content, threadId });
      dispatch(addComment(comment));
    } catch (error: any) {
      alert(error.message);
    }
  },
);

export const asyncToggleVoteThreadDetail = createAsyncThunk(
  'threadDetail/toggleVoteThreadDetail',
  async ({ threadId, voteType, userId }: any, { dispatch }) => {
    dispatch(toggleVoteThreadDetail({ userId, voteType }));
    try {
      await api.toggleVoteThread(threadId, voteType);
    } catch {
      dispatch(toggleVoteThreadDetail({ userId, voteType: 0 }));
    }
  },
);

export const asyncToggleVoteComment = createAsyncThunk(
  'threadDetail/toggleVoteComment',
  async ({ threadId, commentId, voteType, userId }: any, { dispatch }) => {
    dispatch(toggleVoteComment({ commentId, voteType, userId }));
    try {
      await api.toggleVoteComment(threadId, commentId, voteType);
    } catch {
      dispatch(toggleVoteComment({ commentId, voteType: 0, userId }));
    }
  },
);
