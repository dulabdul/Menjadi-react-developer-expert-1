import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from './states';
import { asyncPreloadProcess } from './states/isPreload/action';
import Navigation from './components/Navigation';
import Loading from './components/Loading';
import HomePage from './pages/HomePage';
import DetailPage from './pages/DetailPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import LeaderboardPage from './pages/LeaderboardPage';

function App() {
  const { isPreload } = useSelector((state: RootState) => state as any);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  if (isPreload) {
    return null;
  }

  return (
    <div className='min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300'>
      <Loading />
      <Navigation />
      <main>
        <Routes>
          <Route
            path='/'
            element={<HomePage />}
          />
          <Route
            path='/threads/:id'
            element={<DetailPage />}
          />
          <Route
            path='/leaderboards'
            element={<LeaderboardPage />}
          />
          <Route
            path='/login'
            element={<LoginPage />}
          />
          <Route
            path='/register'
            element={<RegisterPage />}
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
