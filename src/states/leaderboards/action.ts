import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api';
import { receiveThreads } from '../threads/reducer';
import { receiveUsers } from '../users/reducer';

export const asyncPopulateUsersAndThreads = createAsyncThunk(
  'shared/populateUsersAndThreads',
  async (_, { dispatch }) => {
    try {
      const users = await api.getAllUsers();
      const threads = await api.getAllThreads();

      dispatch(receiveUsers(users));
      dispatch(receiveThreads(threads));
    } catch (error) {
      console.error(error);
    }
  },
);
