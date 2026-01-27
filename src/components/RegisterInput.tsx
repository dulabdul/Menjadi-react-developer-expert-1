import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaExclamationCircle } from 'react-icons/fa';

interface RegisterInputProps {
  register: ({ name, email, password }: any) => void;
  isLoading: boolean;
  errorMessage: string;
}

export default function RegisterInput({
  register,
  isLoading,
  errorMessage,
}: RegisterInputProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    register({ name, email, password });
  };

  return (
    <form
      onSubmit={onSubmit}
      className='bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-md border border-gray-100 dark:border-gray-700 transition-colors duration-300'>
      <h2 className='text-3xl font-bold mb-6 text-center text-gray-800 dark:text-gray-100 transition-colors'>
        Create Account
      </h2>

      {errorMessage && (
        <div className='bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-3 rounded-lg mb-4 flex items-center gap-2 text-sm border border-red-100 dark:border-red-800 transition-colors'>
          <FaExclamationCircle /> {errorMessage}
        </div>
      )}

      <div className='space-y-4'>
        <div>
          <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 transition-colors'>
            Name
          </label>
          <input
            className='w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors'
            type='text'
            placeholder='John Doe'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 transition-colors'>
            Email
          </label>
          <input
            className='w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors'
            type='email'
            placeholder='john@example.com'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 transition-colors'>
            Password
          </label>
          <input
            className='w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors'
            type='password'
            placeholder='••••••'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
      </div>

      <button
        disabled={isLoading}
        className={`w-full mt-8 text-white p-3 rounded-lg font-bold transition duration-300 ${
          isLoading
            ? 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 shadow-md hover:shadow-lg'
        }`}>
        {isLoading ? 'Processing...' : 'Register'}
      </button>

      <p className='mt-6 text-center text-gray-600 dark:text-gray-400 transition-colors'>
        Already have an account?{' '}
        <Link
          to='/login'
          className='text-blue-600 dark:text-blue-400 font-semibold hover:underline'>
          Login
        </Link>
      </p>
    </form>
  );
}
