import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api';
import { addThread, toggleVoteThread } from './reducer';

export const asyncAddThread = createAsyncThunk(
  'threads/addThread',
  async ({ title, body, category }: any, { dispatch }) => {
    const thread = await api.createThread({ title, body, category });
    dispatch(addThread(thread));
  },
);

export const asyncToggleVoteThread = createAsyncThunk(
  'threads/toggleVote',
  async ({ threadId, voteType, userId }: any, { dispatch }) => {
    dispatch(toggleVoteThread({ threadId, userId, voteType }));
    try {
      await api.toggleVoteThread(threadId, voteType);
    } catch {
      dispatch(toggleVoteThread({ threadId, userId, voteType: 0 }));
      alert('Failed to vote');
    }
  },
);
