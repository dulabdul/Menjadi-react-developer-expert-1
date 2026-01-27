export default function ThreadSkeleton() {
  return (
    <div className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 animate-pulse transition-colors'>
      <div className='flex gap-2 mb-2'>
        <div className='bg-gray-200 dark:bg-gray-700 h-5 w-16 rounded transition-colors'></div>
      </div>
      <div className='bg-gray-200 dark:bg-gray-700 h-6 w-3/4 rounded mb-2 transition-colors'></div>
      <div className='bg-gray-200 dark:bg-gray-700 h-4 w-full rounded mb-1 transition-colors'></div>
      <div className='bg-gray-200 dark:bg-gray-700 h-4 w-5/6 rounded mb-1 transition-colors'></div>
      <div className='bg-gray-200 dark:bg-gray-700 h-4 w-1/2 rounded transition-colors'></div>

      <div className='flex items-center justify-between mt-4'>
        <div className='flex items-center gap-4'>
          <div className='bg-gray-200 dark:bg-gray-700 h-5 w-8 rounded transition-colors'></div>
          <div className='bg-gray-200 dark:bg-gray-700 h-5 w-8 rounded transition-colors'></div>
          <div className='bg-gray-200 dark:bg-gray-700 h-5 w-8 rounded transition-colors'></div>
        </div>
        <div className='bg-gray-200 dark:bg-gray-700 h-4 w-32 rounded transition-colors'></div>
      </div>
    </div>
  );
}
