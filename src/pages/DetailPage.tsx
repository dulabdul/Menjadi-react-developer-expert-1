import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FaThumbsUp, FaThumbsDown, FaRegComment } from 'react-icons/fa';
import type { RootState, AppDispatch } from '../states';
import {
  asyncReceiveThreadDetail,
  asyncAddComment,
} from '../states/threadDetail/action';
import { asyncToggleVoteThread } from '../states/threads/action';
import CommentItem from '../components/CommentItem';
import CommentInput from '../components/CommentInput';
import DetailSkeleton from '../components/DetailSkeleton';
import { postedAt } from '../utils';

export default function DetailPage() {
  const { id } = useParams();
  const { threadDetail, authUser } = useSelector(
    (state: RootState) => state as any,
  );
  const dispatch = useDispatch<AppDispatch>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = () => {
      setIsLoading(true);
      dispatch(asyncReceiveThreadDetail(id as string)).then(() => {
        setIsLoading(false);
      });
    };
    if (id) {
      fetchDetail();
    }
  }, [id, dispatch]);

  const onUpVote = () => {
    if (!id) return;
    if (!authUser) return alert('Please login first');

    const isUpVoted = threadDetail.upVotesBy.includes(authUser.id);

    dispatch(
      asyncToggleVoteThread({
        threadId: id,
        voteType: isUpVoted ? 0 : 1,
        userId: authUser.id,
      }),
    );
  };

  const onDownVote = () => {
    if (!id) return;
    if (!authUser) return alert('Please login first');

    const isDownVoted = threadDetail.downVotesBy.includes(authUser.id);

    dispatch(
      asyncToggleVoteThread({
        threadId: id,
        voteType: isDownVoted ? 0 : -1,
        userId: authUser.id,
      }),
    );
  };

  const onCommentSubmit = (content: string) => {
    if (!id) return;
    dispatch(asyncAddComment({ content, threadId: id }));
  };

  if (isLoading) {
    return <DetailSkeleton />;
  }

  if (!threadDetail) return null;

  const isUpVoted = authUser && threadDetail.upVotesBy.includes(authUser.id);
  const isDownVoted =
    authUser && threadDetail.downVotesBy.includes(authUser.id);

  return (
    <div className='container mx-auto px-4 max-w-4xl pb-10'>
      <div className='bg-white dark:bg-gray-800 p-8 rounded-lg shadow mb-6 transition-colors duration-300'>
        <span className='bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-xs text-gray-600 dark:text-gray-300 font-medium transition-colors'>
          #{threadDetail.category}
        </span>
        <h1 className='text-3xl font-bold mt-2 mb-4 text-gray-900 dark:text-gray-100 transition-colors'>
          {threadDetail.title}
        </h1>
        <div className='flex items-center gap-3 mb-6'>
          <img
            src={threadDetail.owner.avatar}
            alt={threadDetail.owner.name}
            className='w-10 h-10 rounded-full'
          />
          <div>
            <p className='font-bold text-gray-900 dark:text-gray-100 transition-colors'>
              {threadDetail.owner.name}
            </p>
            <p className='text-xs text-gray-500 dark:text-gray-400 transition-colors'>
              {postedAt(threadDetail.createdAt)}
            </p>
          </div>
        </div>
        <div
          className='prose max-w-none mb-6 text-gray-800 dark:text-gray-200 transition-colors'
          dangerouslySetInnerHTML={{ __html: threadDetail.body }}
        />

        <div className='flex items-center gap-4 text-gray-600 dark:text-gray-400 border-t border-gray-100 dark:border-gray-700 pt-4 transition-colors'>
          <button
            onClick={onUpVote}
            className={`flex items-center gap-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors ${isUpVoted ? 'text-blue-600 dark:text-blue-400 font-bold' : ''}`}>
            <FaThumbsUp /> {threadDetail.upVotesBy.length}
          </button>
          <button
            onClick={onDownVote}
            className={`flex items-center gap-2 hover:text-red-600 dark:hover:text-red-400 transition-colors ${isDownVoted ? 'text-red-600 dark:text-red-400 font-bold' : ''}`}>
            <FaThumbsDown /> {threadDetail.downVotesBy.length}
          </button>
          <div className='flex items-center gap-2'>
            <FaRegComment /> {threadDetail.comments.length}
          </div>
        </div>
      </div>

      <div className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow transition-colors duration-300'>
        <h3 className='font-bold text-lg mb-4 text-gray-900 dark:text-gray-100 transition-colors'>
          Comments ({threadDetail.comments.length})
        </h3>
        {authUser ? (
          <CommentInput submitComment={onCommentSubmit} />
        ) : (
          <p className='text-center mb-6 text-gray-500 dark:text-gray-400 italic transition-colors'>
            Log in to comment
          </p>
        )}

        <div className='flex flex-col gap-2'>
          {threadDetail.comments.map((comment: any) => (
            <CommentItem
              key={comment.id}
              comment={comment}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
