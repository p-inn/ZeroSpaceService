import React from 'react';


export default function Header() {
  return (
    <header className="fixed top-0 w-full bg-transparent py-3 px-3 border shadow-[0px_10px_10px_-5px_rgba(0,0,0,0.3)]">
      <div className="mx-auto px-5 md:px-0">
        <div className="flex items-center justify-start h-12">
          <img src='/assets/ZERO SPACE.png' alt='제로스페이스로고' className='mx-4'/>
          <div className="badge badge-neutral px-2 mx-3">beta</div>
          <span className='px-2 mx-3'>캘린더</span>
        </div>
      </div>
    </header>
  );
}