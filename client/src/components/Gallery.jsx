import React from 'react';
import { feature, imagesUrl } from '../utility/itemList';
const Gallery = () => {
  return (
    <>
      <div className="flex flex-col gap-2 mt-5 mb-5 w-[100%] lg:flex-row lg:mt-10 lg:mb-10 lg:gap-4 sm:flex-col md:flex-col">
        <div className="w-[100%] lg:w-[40%] md:w-[100%] sm:w-[100%]">
          <img className="h-[400px] w-[100%]" src={feature} alt="Featured" />
        </div>
        <div className="flex flex-wrap justify-center flex-row gap-3 sm:w-[100%] md:w-[100%]">
          {imagesUrl.map((image, i) => (
            <div key={i} className="w-max-full">
              <img
                className="h-[192px] w-[200px] xsm:w-[300px] xmd:w-[200px] sm:w-[180px] md:w-[180px] lg:w-[130px] xl:w-[160px] 2xl:w-[180px]"
                src={image}
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
