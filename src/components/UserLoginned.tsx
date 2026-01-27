import React from 'react';

interface UserLoginnedProps {
  user: {
    name: string;
    avatar: string;
  };
}

export default function UserLoginned({ user }: UserLoginnedProps) {
  return (
    <div className='flex items-center gap-3 px-3 py-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200'>
      <img
        src={user.avatar}
        alt={user.name}
        className='w-8 h-8 rounded-full border border-gray-200 dark:border-gray-600 object-cover'
      />
      <span className='font-medium text-sm text-gray-700 dark:text-gray-200 hidden sm:block'>
        {user.name}
      </span>
    </div>
  );
}
