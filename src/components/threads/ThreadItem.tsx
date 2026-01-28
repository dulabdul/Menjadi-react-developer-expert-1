import { Link } from 'react-router-dom';
import { FaThumbsUp, FaThumbsDown, FaRegComment } from 'react-icons/fa';
import parse from 'html-react-parser';
import { postedAt } from '../../utils';

interface ThreadItemProps {
  id: string;
  title: string;
  body: string;
  category: string;
  createdAt: string;
  totalComments: number;
  upVotesBy: string[];
  downVotesBy: string[];
  user: any;
  authUser: any;
  onUpVote: (id: string) => void;
  onDownVote: (id: string) => void;
}

export default function ThreadItem({
  id,
  title,
  body,
  category,
  createdAt,
  totalComments,
  user,
  upVotesBy,
  downVotesBy,
  authUser,
  onUpVote,
  onDownVote,
}: ThreadItemProps) {
  const isUpVoted = authUser && upVotesBy.includes(authUser.id);
  const isDownVoted = authUser && downVotesBy.includes(authUser.id);

  return (
    <div className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all duration-300'>
      <div className='flex gap-2 mb-2'>
        <span className='bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs px-2 py-1 rounded transition-colors'>
          #{category}
        </span>
      </div>
      <Link
        to={`/threads/${id}`}
        className='text-xl font-bold text-gray-800 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors'>
        {title}
      </Link>
      <div className='text-gray-600 dark:text-gray-300 mt-2 line-clamp-3 transition-colors'>
        {parse(body)}
      </div>

      <div className='flex items-center justify-between mt-4 text-sm text-gray-500 dark:text-gray-400 transition-colors'>
        <div className='flex items-center gap-4'>
          <button
            onClick={() => onUpVote(id)}
            className={`flex items-center gap-1 hover:text-blue-600 transition-colors ${
              isUpVoted ? 'text-blue-600 dark:text-blue-400' : ''
            }`}>
            <FaThumbsUp /> {upVotesBy.length}
          </button>
          <button
            onClick={() => onDownVote(id)}
            className={`flex items-center gap-1 hover:text-red-600 transition-colors ${
              isDownVoted ? 'text-red-600 dark:text-red-400' : ''
            }`}>
            <FaThumbsDown /> {downVotesBy.length}
          </button>
          <span className='flex items-center gap-1'>
            <FaRegComment /> {totalComments}
          </span>
        </div>
        <div className='flex items-center gap-2'>
          <span>{postedAt(createdAt)}</span>
          <span>by {user?.name}</span>
        </div>
      </div>
    </div>
  );
}
