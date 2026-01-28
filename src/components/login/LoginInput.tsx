import React, { useState } from 'react';

interface LoginInputProps {
  login: ({ email, password }: any) => void;
}

export default function LoginInput({ login }: LoginInputProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login({ email, password });
  };

  return (
    <form
      onSubmit={onSubmit}
      className='bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md transition-colors duration-300'>
      <h2 className='text-2xl font-bold mb-6 text-center text-gray-900 dark:text-gray-100 transition-colors'>
        Login
      </h2>
      <input
        className='w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 p-3 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors'
        type='email'
        placeholder='Email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        className='w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 p-3 rounded mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors'
        type='password'
        placeholder='Password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button className='w-full bg-blue-600 text-white p-3 rounded font-bold hover:bg-blue-700 dark:hover:bg-blue-500 transition-colors'>
        Login
      </button>
    </form>
  );
}
