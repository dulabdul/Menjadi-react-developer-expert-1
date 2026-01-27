export default function DetailSkeleton() {
  return (
    <div className='container mx-auto px-4 max-w-4xl pb-10 animate-pulse'>
      <div className='bg-white dark:bg-gray-800 p-8 rounded-lg shadow mb-6 transition-colors'>
        <div className='bg-gray-200 dark:bg-gray-700 h-5 w-20 rounded mb-4 transition-colors'></div>
        <div className='bg-gray-200 dark:bg-gray-700 h-8 w-3/4 rounded mb-4 transition-colors'></div>

        <div className='flex items-center gap-3 mb-6'>
          <div className='w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full transition-colors'></div>
          <div>
            <div className='bg-gray-200 dark:bg-gray-700 h-4 w-24 rounded mb-1 transition-colors'></div>
            <div className='bg-gray-200 dark:bg-gray-700 h-3 w-16 rounded transition-colors'></div>
          </div>
        </div>

        <div className='space-y-3 mb-6'>
          <div className='bg-gray-200 dark:bg-gray-700 h-4 w-full rounded transition-colors'></div>
          <div className='bg-gray-200 dark:bg-gray-700 h-4 w-full rounded transition-colors'></div>
          <div className='bg-gray-200 dark:bg-gray-700 h-4 w-5/6 rounded transition-colors'></div>
          <div className='bg-gray-200 dark:bg-gray-700 h-4 w-full rounded transition-colors'></div>
        </div>
      </div>

      <div className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow transition-colors'>
        <div className='bg-gray-200 dark:bg-gray-700 h-6 w-32 rounded mb-4 transition-colors'></div>
        <div className='bg-gray-200 dark:bg-gray-700 h-10 w-full rounded mb-6 transition-colors'></div>
        <div className='space-y-4'>
          <div className='bg-gray-200 dark:bg-gray-700 h-16 w-full rounded transition-colors'></div>
          <div className='bg-gray-200 dark:bg-gray-700 h-16 w-full rounded transition-colors'></div>
          <div className='bg-gray-200 dark:bg-gray-700 h-16 w-full rounded transition-colors'></div>
        </div>
      </div>
    </div>
  );
}
