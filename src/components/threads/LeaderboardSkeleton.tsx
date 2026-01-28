import React from 'react';

export default function LeaderboardSkeleton() {
  return (
    <div className='flex justify-between items-center px-6 py-4 border-b border-gray-100 dark:border-gray-700 last:border-0 animate-pulse transition-colors'>
      <div className='flex items-center gap-3'>
        <div className='w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full transition-colors'></div>
        <div className='h-4 bg-gray-200 dark:bg-gray-700 rounded w-32 transition-colors'></div>
      </div>
      <div className='h-6 bg-gray-200 dark:bg-gray-700 rounded w-8 transition-colors'></div>
    </div>
  );
}
