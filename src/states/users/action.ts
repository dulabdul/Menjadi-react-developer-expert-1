import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api';

export const asyncRegisterUser = createAsyncThunk(
  'users/register',
  async ({ name, email, password }: any, { rejectWithValue }) => {
    try {
      await api.register({ name, email, password });
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);
