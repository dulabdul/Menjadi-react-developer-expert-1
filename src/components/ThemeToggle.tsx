import { FaMoon, FaSun } from 'react-icons/fa';
import { useTheme } from '../contexts/ThemeContext';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className='p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-gray-600 dark:text-gray-300'
      aria-label='Toggle Dark Mode'>
      {theme === 'light' ? <FaMoon /> : <FaSun className='text-yellow-400' />}
    </button>
  );
}
