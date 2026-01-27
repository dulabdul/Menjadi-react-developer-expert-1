import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api';
import { setAuthUser } from '../auth/reducer';

export const asyncPreloadProcess = createAsyncThunk(
  'isPreload/preloadProcess',
  async (_, { dispatch }) => {
    try {
      const authUser = await api.getOwnProfile();
      dispatch(setAuthUser(authUser));
    } catch {
      dispatch(setAuthUser(null));
    }
  },
);
