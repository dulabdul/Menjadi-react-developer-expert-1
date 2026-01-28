/**
 * test scenario for usersReducer
 *
 * - usersReducer function
 * - should return the initial state when given by unknown action
 * - should return the users when given by RECEIVE_USERS action
 *
 */

import { describe, it, expect } from 'vitest';
import usersReducer from './reducer';

describe('usersReducer function', () => {
  it('should return the initial state when given by unknown action', () => {
    const initialState: any[] = [];
    const action = { type: 'UNKNOWN' };

    const nextState = usersReducer(initialState as any, action as any);

    expect(nextState).toEqual(initialState);
  });

  it('should return the users when given by RECEIVE_USERS action', () => {
    const initialState: any[] = [];
    const users = [
      {
        id: 'user-1',
        name: 'John Doe',
        email: 'john@example.com',
        avatar: 'https://generated-image-url.jpg',
      },
      {
        id: 'user-2',
        name: 'Jane Doe',
        email: 'jane@example.com',
        avatar: 'https://generated-image-url.jpg',
      },
    ];
    const action = {
      type: 'users/receiveUsers',
      payload: users,
    };

    const nextState = usersReducer(initialState as any, action as any);

    expect(nextState).toEqual(users);
  });
});
