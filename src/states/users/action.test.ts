import { describe, afterEach, it, expect, vi } from 'vitest';
import { asyncRegisterUser } from './action';
import api from '../../utils/api';

const fakeRegisterResponse = {
  id: 'user-1',
  name: 'John Doe',
  email: 'john@example.com',
  avatar: 'https://generated-image-url.jpg',
};

const fakeErrorResponse = new Error('Ups, something went wrong');

describe('asyncRegisterUser thunk', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should dispatch action correctly when data fetching success', async () => {
    vi.spyOn(api, 'register').mockResolvedValue(fakeRegisterResponse);

    const dispatch = vi.fn();
    const getState = vi.fn();

    await asyncRegisterUser({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
    })(dispatch, getState, undefined);

    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'users/register/pending',
      }),
    );

    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'users/register/fulfilled',
        payload: undefined,
      }),
    );
  });

  it('should dispatch action and call rejectWithValue correctly when data fetching failed', async () => {
    vi.spyOn(api, 'register').mockRejectedValue(fakeErrorResponse);

    const dispatch = vi.fn();
    const getState = vi.fn();

    await asyncRegisterUser({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
    })(dispatch, getState, undefined);

    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'users/register/pending',
      }),
    );

    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'users/register/rejected',
        payload: fakeErrorResponse.message,
      }),
    );
  });
});
