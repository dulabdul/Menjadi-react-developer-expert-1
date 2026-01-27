import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../states';
import { asyncReceiveLeaderboards } from '../states/leaderboards/reducer';
import LeaderboardItem from '../components/LeaderboardItem';
import LeaderboardSkeleton from '../components/LeaderboardSkeleton';

export default function LeaderboardPage() {
  const leaderboards = useSelector((state: RootState) => state.leaderboards);
  const dispatch = useDispatch<AppDispatch>();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dispatch(asyncReceiveLeaderboards()).then(() => {
      setIsLoading(false);
    });
  }, [dispatch]);

  return (
    <div className='container mx-auto px-4 max-w-2xl mt-8 transition-colors duration-300'>
      <h2 className='text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100 transition-colors'>
        Leaderboards
      </h2>
      <div className='bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden transition-colors duration-300'>
        <div className='bg-gray-50 dark:bg-gray-700 px-6 py-3 border-b border-gray-200 dark:border-gray-600 flex justify-between font-bold text-gray-600 dark:text-gray-300 uppercase text-sm tracking-wider transition-colors'>
          <span>User</span>
          <span>Score</span>
        </div>

        {isLoading
          ? Array.from({ length: 5 }).map((_, index) => (
            <LeaderboardSkeleton key={index} />
          ))
          : leaderboards.map(({ user, score }: any) => (
            <LeaderboardItem
              key={user.id}
              user={user}
              score={score}
            />
          ))}
      </div>
    </div>
  );
}
