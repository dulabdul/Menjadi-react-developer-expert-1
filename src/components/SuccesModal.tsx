import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message: string;
  buttonText?: string;
}

export default function SuccessModal({
  isOpen,
  onClose,
  title = 'Success!',
  message,
  buttonText = 'OK',
}: SuccessModalProps) {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm transition-opacity'>
      <div className='bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-sm w-full mx-4 shadow-2xl transform transition-all scale-100 text-center duration-300'>
        <div className='mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-green-100 dark:bg-green-900/30 mb-6 transition-colors'>
          <FaCheckCircle className='h-10 w-10 text-green-600 dark:text-green-400 transition-colors' />
        </div>

        <h3 className='text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2 transition-colors'>
          {title}
        </h3>

        <p className='text-gray-500 dark:text-gray-400 mb-8 transition-colors'>
          {message}
        </p>

        <button
          onClick={onClose}
          className='w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-xl hover:bg-blue-700 dark:hover:bg-blue-500 transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-lg'>
          {buttonText}
        </button>
      </div>
    </div>
  );
}
