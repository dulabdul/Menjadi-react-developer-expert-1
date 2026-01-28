import { useState } from 'react';

interface CommentInputProps {
  submitComment: (content: string) => void;
}

export default function CommentInput({ submitComment }: CommentInputProps) {
  const [content, setContent] = useState('');

  const onSubmit = () => {
    if (content.trim()) {
      submitComment(content);
      setContent('');
    }
  };

  return (
    <div className='flex gap-2 mb-6'>
      <input
        className='flex-1 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors'
        placeholder='Write a comment...'
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button
        onClick={onSubmit}
        className='bg-blue-600 text-white px-6 rounded hover:bg-blue-700 font-bold transition-colors'>
        Send
      </button>
    </div>
  );
}
