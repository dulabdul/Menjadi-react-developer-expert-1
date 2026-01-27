const BASE_URL = 'https://forum-api.dicoding.dev/v1';

function getAccessToken() {
  return localStorage.getItem('accessToken');
}

function putAccessToken(token: string) {
  localStorage.setItem('accessToken', token);
}

async function fetchWithAuth(url: string, options: RequestInit = {}) {
  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${getAccessToken()}`,
    },
  });
}

const api = {
  putAccessToken,
  getAccessToken,

  async register({ name, email, password }: any) {
    const response = await fetch(`${BASE_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });
    const responseJson = await response.json();
    const { status, message } = responseJson;
    if (status !== 'success') throw new Error(message);
    return responseJson.data.user;
  },

  async login({ email, password }: any) {
    const response = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const responseJson = await response.json();
    const { status, message } = responseJson;
    if (status !== 'success') throw new Error(message);
    return responseJson.data.token;
  },

  async getOwnProfile() {
    const response = await fetchWithAuth(`${BASE_URL}/users/me`);
    const responseJson = await response.json();
    const { status, message } = responseJson;
    if (status !== 'success') throw new Error(message);
    return responseJson.data.user;
  },

  async getAllUsers() {
    const response = await fetch(`${BASE_URL}/users`);
    const responseJson = await response.json();
    const { status, message } = responseJson;
    if (status !== 'success') throw new Error(message);
    return responseJson.data.users;
  },

  async getAllThreads() {
    const response = await fetch(`${BASE_URL}/threads`);
    const responseJson = await response.json();
    const { status, message } = responseJson;
    if (status !== 'success') throw new Error(message);
    return responseJson.data.threads;
  },

  async getThreadDetail(id: string) {
    const response = await fetch(`${BASE_URL}/threads/${id}`);
    const responseJson = await response.json();
    const { status, message } = responseJson;
    if (status !== 'success') throw new Error(message);
    return responseJson.data.detailThread;
  },

  async createThread({ title, body, category }: any) {
    const response = await fetchWithAuth(`${BASE_URL}/threads`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, body, category }),
    });
    const responseJson = await response.json();
    const { status, message } = responseJson;
    if (status !== 'success') throw new Error(message);
    return responseJson.data.thread;
  },

  async createComment({ content, threadId }: any) {
    const response = await fetchWithAuth(`${BASE_URL}/threads/${threadId}/comments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content }),
    });
    const responseJson = await response.json();
    const { status, message } = responseJson;
    if (status !== 'success') throw new Error(message);
    return responseJson.data.comment;
  },

  async toggleVoteThread(threadId: string, voteType: number) {
    let url = `${BASE_URL}/threads/${threadId}`;
    if (voteType === 1) url += '/up-vote';
    else if (voteType === -1) url += '/down-vote';
    else url += '/neutral-vote';

    const response = await fetchWithAuth(url, { method: 'POST' });
    const responseJson = await response.json();
    if (responseJson.status !== 'success') throw new Error(responseJson.message);
  },

  async getLeaderboards() {
    const response = await fetch(`${BASE_URL}/leaderboards`);
    const responseJson = await response.json();
    const { status, message } = responseJson;
    if (status !== 'success') throw new Error(message);
    return responseJson.data.leaderboards;
  },
};

export default api;
