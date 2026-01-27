import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api';
import { receiveThreadDetail, addComment } from './reducer';

export const asyncReceiveThreadDetail = createAsyncThunk(
  'threadDetail/receive',
  async (threadId: string, { dispatch }) => {
    const threadDetail = await api.getThreadDetail(threadId);
    dispatch(receiveThreadDetail(threadDetail));
  },
);

export const asyncAddComment = createAsyncThunk(
  'threadDetail/addComment',
  async ({ content, threadId }: any, { dispatch }) => {
    const comment = await api.createComment({ content, threadId });
    dispatch(addComment(comment));
  },
);
