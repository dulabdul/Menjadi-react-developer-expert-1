import { describe, it, expect } from 'vitest';
import threadsReducer from './reducer';

describe('threadsReducer function', () => {
  it('should return the initial state when given by unknown action', () => {
    const initialState: any[] = [];
    const action = { type: 'UNKNOWN' };

    const nextState = threadsReducer(initialState, action);

    expect(nextState).toEqual(initialState);
  });

  it('should return the threads when given by receiveThreads action', () => {
    const initialState: any[] = [];
    const action = {
      type: 'threads/receiveThreads',
      payload: [
        {
          id: 'thread-1',
          title: 'Thread Test',
          body: 'Body Test',
          category: 'General',
          createdAt: '2023-05-29T07:55:52.266Z',
          ownerId: 'user-1',
          upVotesBy: [],
          downVotesBy: [],
          totalComments: 0,
        },
      ],
    };

    const nextState = threadsReducer(initialState, action);

    expect(nextState).toEqual(action.payload);
  });

  it('should return the threads with the new thread when given by addThread action', () => {
    const initialState = [
      {
        id: 'thread-1',
        title: 'Thread Test',
        body: 'Body Test',
        category: 'General',
        createdAt: '2023-05-29T07:55:52.266Z',
        ownerId: 'user-1',
        upVotesBy: [],
        downVotesBy: [],
        totalComments: 0,
      },
    ];

    const newThread = {
      id: 'thread-2',
      title: 'Thread Test 2',
      body: 'Body Test 2',
      category: 'General',
      createdAt: '2023-05-29T07:55:52.266Z',
      ownerId: 'user-2',
      upVotesBy: [],
      downVotesBy: [],
      totalComments: 0,
    };

    const action = {
      type: 'threads/addThread',
      payload: newThread,
    };

    const nextState = threadsReducer(initialState, action);

    expect(nextState).toEqual([newThread, ...initialState]);
  });
});
