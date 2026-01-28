/**
 * test scenario for asyncPopulateUsersAndThreads
 *
 * - asyncPopulateUsersAndThreads function
 * - should dispatch action correctly when data fetching success
 * - should dispatch action and call alert correctly when data fetching failed
 */

import { describe, beforeEach, afterEach, it, expect, vi } from 'vitest';
import { asyncPopulateUsersAndThreads } from './action';
import api from '../../utils/api';

const fakeThreadsResponse = [
  {
    id: 'thread-1',
    title: 'Thread Pertama',
    body: 'Ini adalah thread pertama',
    category: 'General',
    createdAt: '2021-06-21T07:00:00.000Z',
    ownerId: 'users-1',
    upVotesBy: [],
    downVotesBy: [],
    totalComments: 0,
  },
];

const fakeUsersResponse = [
  {
    id: 'user-1',
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://generated-image-url.jpg',
  },
];

const fakeErrorResponse = new Error('Ups, something went wrong');

describe('asyncPopulateUsersAndThreads thunk', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should dispatch action correctly when data fetching success', async () => {
    vi.spyOn(api, 'getAllUsers').mockResolvedValue(fakeUsersResponse);
    vi.spyOn(api, 'getAllThreads').mockResolvedValue(fakeThreadsResponse);

    const dispatch = vi.fn();

    await asyncPopulateUsersAndThreads()(dispatch, () => ({}), {});
    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({ type: 'loading-bar/SHOW' }),
    );
    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'users/receiveUsers',
        payload: fakeUsersResponse,
      }),
    );
    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'threads/receiveThreads',
        payload: fakeThreadsResponse,
      }),
    );
    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({ type: 'loading-bar/HIDE' }),
    );
  });

  it('should dispatch action and call alert correctly when data fetching failed', async () => {
    vi.spyOn(api, 'getAllUsers').mockRejectedValue(fakeErrorResponse);
    vi.spyOn(api, 'getAllThreads').mockRejectedValue(fakeErrorResponse);

    const dispatch = vi.fn();
    window.alert = vi.fn();

    await asyncPopulateUsersAndThreads()(dispatch, () => ({}), {});
    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({ type: 'loading-bar/SHOW' }),
    );
    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({ type: 'loading-bar/HIDE' }),
    );
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
  });
});
