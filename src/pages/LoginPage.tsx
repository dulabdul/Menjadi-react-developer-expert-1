import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../states';
import { asyncSetAuthUser } from '../states/auth/action';
import LoginInput from '../components/login/LoginInput';

export default function LoginPage() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const onLogin = async ({ email, password }: any) => {
    await dispatch(asyncSetAuthUser({ email, password }));
    navigate('/');
  };

  return (
    <div className='flex flex-col justify-center items-center h-[80vh] transition-colors duration-300'>
      <LoginInput login={onLogin} />

      <p className='mt-4 text-center text-gray-600 dark:text-gray-400 transition-colors'>
        Don&apos;t have an account?{' '}
        <Link
          to='/register'
          className='text-blue-500 dark:text-blue-400 hover:underline'>
          Register
        </Link>
      </p>
    </div>
  );
}
