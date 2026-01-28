import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FaUser, FaSignOutAlt, FaTrophy, FaComments } from 'react-icons/fa';
import type { RootState, AppDispatch } from '../states';
import { asyncUnsetAuthUser } from '../states/auth/action';
import ThemeToggle from './ThemeToggle';
import UserLoginned from './login/UserLoginned';

export default function Navigation() {
  const authUser = useSelector((state: RootState) => state.authUser as any);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className='bg-white dark:bg-gray-800 shadow-md p-4 mb-6 sticky top-0 z-50 transition-colors duration-300'>
      <div className='container mx-auto flex justify-between items-center'>
        <Link
          to='/'
          className='text-xl font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2'>
          <FaComments /> Dicoding Forum
        </Link>
        <div className='flex gap-4 items-center'>
          <ThemeToggle />
          <Link
            to='/leaderboards'
            className='text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 flex items-center gap-1'>
            <FaTrophy /> <span className='hidden md:inline'>Leaderboards</span>
          </Link>

          {authUser ? (
            <div className='flex items-center gap-4 pl-4 border-l border-gray-200 dark:border-gray-700'>
              <UserLoginned user={authUser} />
              <button
                onClick={() => dispatch(asyncUnsetAuthUser())}
                className='text-red-500 hover:text-red-700 flex items-center gap-1 transition-colors'
                title='Logout'>
                <FaSignOutAlt />
              </button>
            </div>
          ) : (
            <Link
              to='/login'
              className='text-blue-500 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex items-center gap-1 pl-4 border-l border-gray-200 dark:border-gray-700'>
              <FaUser /> Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
