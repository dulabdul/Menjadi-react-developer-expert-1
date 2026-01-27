import LoadingBar from 'react-redux-loading-bar';

export default function Loading() {
  return (
    <div className='sticky top-0 z-50'>
      <LoadingBar
        updateTime={100}
        maxProgress={95}
        progressIncrease={10}
        style={{ backgroundColor: 'blue', height: '4px' }}
      />
    </div>
  );
}
