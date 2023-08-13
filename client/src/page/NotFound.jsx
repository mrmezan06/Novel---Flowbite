import React from 'react';

const NotFound = () => {
  return (
    <>
      <div className="flex justify-center flex-col items-center mt-[8rem] mb-[8rem] px-10">
        <h1 className="text-3xl font-extrabold text-slate-800 xl:text-9xl lg:text-7xl md:text-7xl sm:text-5xl">
          404
        </h1>
        <h2 className="text-3xl font-extrabold xl:text-9xl lg:text-7xl md:text-6xl sm:text-5xl">
          Page Not Found
        </h2>
      </div>
    </>
  );
};

export default NotFound;
