import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../states';
import { asyncPopulateUsersAndThreads } from '../states/shared/action';
import {
  asyncAddThread,
  asyncToggleVoteThread,
} from '../states/threads/action';
import ThreadItem from '../components/threads/ThreadItem';
import ThreadInput from '../components/threads/ThreadInput';
import CategoryList from '../components/CategoryList';
import ThreadSkeleton from '../components/threads/ThreadSkeleton';
import LoginModal from '../components/modal/LoginModal';

export default function HomePage() {
  const { threads, users, authUser } = useSelector(
    (state: RootState) => state as any,
  );
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [filter, setFilter] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    dispatch(asyncPopulateUsersAndThreads()).then(() => {
      setIsLoading(false);
    });
  }, [dispatch]);

  const onAddThread = (data: any) => {
    dispatch(asyncAddThread(data));
  };

  const onUpVote = (id: string) => {
    if (!authUser) {
      setShowLoginModal(true);
      return;
    }

    const thread = threads.find((t: any) => t.id === id);
    const isUpVoted = thread.upVotesBy.includes(authUser.id);

    dispatch(
      asyncToggleVoteThread({
        threadId: id,
        voteType: isUpVoted ? 0 : 1,
        userId: authUser.id,
      }),
    );
  };

  const onDownVote = (id: string) => {
    if (!authUser) {
      setShowLoginModal(true);
      return;
    }

    const thread = threads.find((t: any) => t.id === id);
    const isDownVoted = thread.downVotesBy.includes(authUser.id);

    dispatch(
      asyncToggleVoteThread({
        threadId: id,
        voteType: isDownVoted ? 0 : -1,
        userId: authUser.id,
      }),
    );
  };

  const threadList = threads.map((thread: any) => ({
    ...thread,
    user: users.find((user: any) => user.id === thread.ownerId),
    authUser: authUser,
  }));

  const categories = Array.from(
    new Set(threads.map((t: any) => t.category)),
  ) as string[];

  const filteredThreads = filter
    ? threadList.filter((t: any) => t.category === filter)
    : threadList;

  return (
    <div className='container mx-auto px-4 max-w-4xl pb-10'>
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLogin={() => navigate('/login')}
      />

      {authUser && <ThreadInput addThread={onAddThread} />}

      {!isLoading && (
        <CategoryList
          categories={categories}
          filter={filter}
          setFilter={setFilter}
        />
      )}

      <div className='flex flex-col gap-4'>
        {isLoading
          ? Array.from({ length: 4 }).map((_, index) => (
            <ThreadSkeleton key={index} />
          ))
          : filteredThreads.map((thread: any) => (
            <ThreadItem
              key={thread.id}
              {...thread}
              onUpVote={onUpVote}
              onDownVote={onDownVote}
            />
          ))}
      </div>
    </div>
  );
}
