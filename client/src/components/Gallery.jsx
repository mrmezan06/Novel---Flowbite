import React from 'react';
import { useSelector } from 'react-redux';
const Gallery = () => {
  const { novels } = useSelector((state) => state.hot);
  // slice the array to get only 6 items
  const featureArray = novels?.slice(0, 1);
  const othersArray = novels?.slice(1, 11);
  return (
    <>
      <div className="flex flex-col gap-2 mt-5 mb-5 w-[100%] lg:flex-row lg:mt-10 lg:mb-10 lg:gap-4 sm:flex-col md:flex-col">
        <div className="w-[100%] lg:w-[40%] md:w-[100%] sm:w-[100%]">
          {novels && featureArray.length !== 0 && (
            <img
              className="h-auto w-[100%]"
              src={featureArray[0]?.coverUrl}
              alt="Featured"
            />
          )}
        </div>
        <div className="flex flex-wrap justify-center flex-row gap-3 sm:w-[100%] md:w-[100%]">
          {novels &&
            othersArray.length !== 0 &&
            othersArray.map((other, i) => (
              <div key={i} className="w-max-full">
                <img
                  className="h-[235px] w-[200px] xsm:w-[300px] xmd:w-[200px] sm:w-[180px] md:w-[180px] lg:w-[130px] xl:w-[160px] 2xl:w-[180px]"
                  src={other.coverUrl}
                  alt={i}
                />
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Gallery;
