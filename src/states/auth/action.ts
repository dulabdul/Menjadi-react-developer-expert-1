import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api';

export const asyncSetAuthUser = createAsyncThunk(
  'auth/setAuthUser',
  async ({ email, password }: any) => {
    const token = await api.login({ email, password });
    api.putAccessToken(token);
    const authUser = await api.getOwnProfile();
    return authUser;
  },
);

export const asyncUnsetAuthUser = createAsyncThunk(
  'auth/unsetAuthUser',
  async () => {
    api.putAccessToken('');
    return null;
  },
);
