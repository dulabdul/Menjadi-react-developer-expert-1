import { useState } from 'react';

export default function ThreadInput({
  addThread,
}: {
  addThread: (data: any) => void;
}) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [body, setBody] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addThread({ title, body, category });
    setTitle('');
    setCategory('');
    setBody('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow mb-6 transition-colors duration-300'>
      <h3 className='font-bold text-lg mb-4 text-gray-900 dark:text-gray-100'>
        Create New Thread
      </h3>
      <input
        className='w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 p-2 rounded mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
        type='text'
        placeholder='Title'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        className='w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 p-2 rounded mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
        type='text'
        placeholder='Category'
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <textarea
        className='w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 p-2 rounded mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
        placeholder='What are you thinking?'
        value={body}
        onChange={(e) => setBody(e.target.value)}
        required
      />
      <button className='bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700 transition-colors'>
        Create
      </button>
    </form>
  );
}
