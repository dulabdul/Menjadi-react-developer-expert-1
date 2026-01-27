const api = (() => {
  const BASE_URL = 'https://forum-api.dicoding.dev/v1';

  function putAccessToken(token: string) {
    localStorage.setItem('accessToken', token);
  }

  function getAccessToken() {
    return localStorage.getItem('accessToken');
  }

  async function _fetchWithAuth(url: string, options: any = {}) {
    return fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
  }

  async function register({ name, email, password }: any) {
    const response = await fetch(`${BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    const responseJson = await response.json();
    const { status, message } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    const {
      data: { user },
    } = responseJson;
    return user;
  }

  async function login({ email, password }: any) {
    const response = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const responseJson = await response.json();
    const { status, message } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    const {
      data: { token },
    } = responseJson;
    return token;
  }

  async function getOwnProfile() {
    const response = await _fetchWithAuth(`${BASE_URL}/users/me`);
    const responseJson = await response.json();
    const { status, message } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    const {
      data: { user },
    } = responseJson;
    return user;
  }

  async function getAllUsers() {
    const response = await fetch(`${BASE_URL}/users`);
    const responseJson = await response.json();
    const { status, message } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    const {
      data: { users },
    } = responseJson;
    return users;
  }

  async function getAllThreads() {
    const response = await fetch(`${BASE_URL}/threads`);
    const responseJson = await response.json();
    const { status, message } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    const {
      data: { threads },
    } = responseJson;
    return threads;
  }

  async function createThread({ title, body, category }: any) {
    const response = await _fetchWithAuth(`${BASE_URL}/threads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        body,
        category,
      }),
    });

    const responseJson = await response.json();
    const { status, message } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    const {
      data: { thread },
    } = responseJson;
    return thread;
  }

  async function toggleVoteThread(threadId: string, voteType: number) {
    let response;
    if (voteType === 1) {
      response = await _fetchWithAuth(
        `${BASE_URL}/threads/${threadId}/up-vote`,
        {
          method: 'POST',
        },
      );
    } else if (voteType === -1) {
      response = await _fetchWithAuth(
        `${BASE_URL}/threads/${threadId}/down-vote`,
        {
          method: 'POST',
        },
      );
    } else {
      response = await _fetchWithAuth(
        `${BASE_URL}/threads/${threadId}/neutral-vote`,
        {
          method: 'POST',
        },
      );
    }

    const responseJson = await response.json();
    const { status, message } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }
  }

  async function getThreadDetail(id: string) {
    const response = await fetch(`${BASE_URL}/threads/${id}`);
    const responseJson = await response.json();
    const { status, message } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    const {
      data: { detailThread },
    } = responseJson;
    return detailThread;
  }

  async function createComment({ content, threadId }: any) {
    const response = await _fetchWithAuth(
      `${BASE_URL}/threads/${threadId}/comments`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content,
        }),
      },
    );

    const responseJson = await response.json();
    const { status, message } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    const {
      data: { comment },
    } = responseJson;
    return comment;
  }

  async function toggleVoteComment(
    threadId: string,
    commentId: string,
    voteType: number,
  ) {
    let response;
    if (voteType === 1) {
      response = await _fetchWithAuth(
        `${BASE_URL}/threads/${threadId}/comments/${commentId}/up-vote`,
        {
          method: 'POST',
        },
      );
    } else if (voteType === -1) {
      response = await _fetchWithAuth(
        `${BASE_URL}/threads/${threadId}/comments/${commentId}/down-vote`,
        {
          method: 'POST',
        },
      );
    } else {
      response = await _fetchWithAuth(
        `${BASE_URL}/threads/${threadId}/comments/${commentId}/neutral-vote`,
        {
          method: 'POST',
        },
      );
    }

    const responseJson = await response.json();
    const { status, message } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }
  }

  async function getLeaderboards() {
    const response = await fetch(`${BASE_URL}/leaderboards`);
    const responseJson = await response.json();
    const { status, message } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    const {
      data: { leaderboards },
    } = responseJson;
    return leaderboards;
  }

  return {
    putAccessToken,
    getAccessToken,
    register,
    login,
    getOwnProfile,
    getAllUsers,
    getAllThreads,
    createThread,
    toggleVoteThread,
    getThreadDetail,
    createComment,
    toggleVoteComment,
    getLeaderboards,
  };
})();

export default api;
