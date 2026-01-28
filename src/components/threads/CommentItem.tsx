import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
import parse from 'html-react-parser';
import { postedAt } from '../../utils';

interface CommentItemProps {
  comment: any;
  authUser: any;
  onUpVote: (id: string) => void;
  onDownVote: (id: string) => void;
}

export default function CommentItem({
  comment,
  authUser,
  onUpVote,
  onDownVote,
}: CommentItemProps) {
  const isUpVoted = authUser && comment.upVotesBy.includes(authUser.id);
  const isDownVoted = authUser && comment.downVotesBy.includes(authUser.id);

  return (
    <div className='border-t border-gray-100 dark:border-gray-700 py-4 transition-colors'>
      <div className='flex justify-between items-start'>
        <div className='flex gap-3 w-full'>
          <img
            src={comment.owner.avatar}
            alt={comment.owner.name}
            className='w-8 h-8 rounded-full'
          />
          <div className='flex-1'>
            <p className='font-bold text-sm text-gray-900 dark:text-gray-100 transition-colors'>
              {comment.owner.name}
            </p>
            <div className='text-gray-700 dark:text-gray-300 mt-1 mb-2 transition-colors'>
              {parse(comment.content)}
            </div>

            <div className='flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400'>
              <div className='flex items-center gap-3'>
                <button
                  onClick={() => onUpVote(comment.id)}
                  className={`flex items-center gap-1 hover:text-blue-600 transition-colors ${
                    isUpVoted ? 'text-blue-600 font-bold' : ''
                  }`}>
                  <FaThumbsUp /> {comment.upVotesBy.length}
                </button>
                <button
                  onClick={() => onDownVote(comment.id)}
                  className={`flex items-center gap-1 hover:text-red-600 transition-colors ${
                    isDownVoted ? 'text-red-600 font-bold' : ''
                  }`}>
                  <FaThumbsDown /> {comment.downVotesBy.length}
                </button>
              </div>
              <span>{postedAt(comment.createdAt)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
