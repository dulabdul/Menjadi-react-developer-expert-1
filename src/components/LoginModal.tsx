import React from 'react';
import { FaGhost } from 'react-icons/fa';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: () => void;
}

export default function LoginModal({
  isOpen,
  onClose,
  onLogin,
}: LoginModalProps) {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm transition-opacity'>
      <div className='bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-sm w-full mx-4 shadow-2xl transform transition-all scale-100 text-center duration-300'>
        <div className='mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-purple-100 dark:bg-purple-900/30 mb-6 transition-colors'>
          <FaGhost className='h-10 w-10 text-purple-600 dark:text-purple-400 transition-colors' />
        </div>

        <h3 className='text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2 transition-colors'>
          Whoops! Ghost Voter?
        </h3>

        <p className='text-gray-500 dark:text-gray-400 mb-8 transition-colors'>
          You need to be signed in to cast your vote. Don't be a ghost, join the
          community!
        </p>

        <div className='flex gap-3'>
          <button
            onClick={onClose}
            className='flex-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-bold py-3 px-4 rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600 transition duration-200'>
            Cancel
          </button>
          <button
            onClick={onLogin}
            className='flex-1 bg-blue-600 text-white font-bold py-3 px-4 rounded-xl hover:bg-blue-700 transition duration-200 shadow-lg'>
            Login Now
          </button>
        </div>
      </div>
    </div>
  );
}
