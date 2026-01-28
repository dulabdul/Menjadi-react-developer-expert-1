import React from 'react';

interface LeaderboardItemProps {
  user: {
    id: string;
    name: string;
    avatar: string;
  };
  score: number;
}

export default function LeaderboardItem({ user, score }: LeaderboardItemProps) {
  return (
    <div className='flex justify-between items-center px-6 py-4 border-b border-gray-100 dark:border-gray-700 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200'>
      <div className='flex items-center gap-3'>
        <img
          src={user.avatar}
          alt={user.name}
          className='w-10 h-10 rounded-full'
        />
        <span className='font-medium text-gray-800 dark:text-gray-100 transition-colors'>
          {user.name}
        </span>
      </div>
      <span className='font-bold text-blue-600 dark:text-blue-400 text-lg transition-colors'>
        {score}
      </span>
    </div>
  );
}
