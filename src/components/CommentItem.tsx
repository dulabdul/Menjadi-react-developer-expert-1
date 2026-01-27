import { postedAt } from '../utils';

export default function CommentItem({ comment }: { comment: any }) {
  return (
    <div className='border-t border-gray-100 dark:border-gray-700 py-4 transition-colors'>
      <div className='flex justify-between items-start'>
        <div className='flex gap-3'>
          <img
            src={comment.owner.avatar}
            alt={comment.owner.name}
            className='w-8 h-8 rounded-full'
          />
          <div>
            <p className='font-bold text-sm text-gray-900 dark:text-gray-100 transition-colors'>
              {comment.owner.name}
            </p>
            <p
              className='text-gray-700 dark:text-gray-300 mt-1 transition-colors'
              dangerouslySetInnerHTML={{ __html: comment.content }}
            />
          </div>
        </div>
        <span className='text-xs text-gray-500 dark:text-gray-400 transition-colors'>
          {postedAt(comment.createdAt)}
        </span>
      </div>
    </div>
  );
}
