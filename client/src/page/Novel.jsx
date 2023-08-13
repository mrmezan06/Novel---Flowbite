import React from 'react';
import { novelObject } from '../utility/itemList';
import { chapterwithName } from '../utility/itemList';
import TablePagination from '../components/TablePagination';

const Novel = () => {
  // divide chapter into two array
  const leftChapter = chapterwithName.slice(0, chapterwithName.length / 2);
  const rightChapter = chapterwithName.slice(chapterwithName.length / 2);

  return (
    <>
      <div className="container mt-10 mb-10">
        <div className="flex flex-row justify-between border border-b-slate-500">
          <h3 className="text-2xl font-semibold border border-b-black">
            Novel Info
          </h3>
        </div>
        <div className="container">
          {/* right Side Image and left side Novel Info */}
          <div className="flex flex-col p-5 lg:flex-row md:flex-col justify-between">
            {/* Left side Novel Info and Cover */}
            <div className="flex flex-col justify-between">
              <div className="mt-5 w-[100%] lg:w-[50%] md:w-[100%] sm:w-[100%]">
                <img
                  className="h-[400px] w-[100%]"
                  src={novelObject.coverUrl}
                  alt={novelObject.name}
                />
              </div>
              <div className="mt-10 flex flex-col gap-3 justify-between w-[100%] lg:w-[50%] md:w-[100%] sm:w-[100%]">
                <div className="flex flex-row gap-4 items-center justify-start flex-wrap">
                  <h3 className="text-xl font-semibold">Author:</h3>
                  <p className="text-justify">{novelObject.author}</p>
                </div>
                <div className="flex flex-row gap-4 items-center justify-start flex-wrap">
                  <h3 className="text-xl font-semibold">Alternative names:</h3>
                  <p className="text-justify">{novelObject.alternativeName}</p>
                </div>
                <div className="flex flex-row gap-4 items-center justify-start flex-wrap ">
                  <h3 className="text-xl font-semibold">Genre:</h3>
                  <p className="text-justify text-lg">{novelObject.category}</p>
                </div>
                <div className="flex flex-row gap-4 items-center justify-start flex-wrap ">
                  <h3 className="text-xl font-semibold">Status:</h3>
                  <p className="text-justify text-lg">{novelObject.status}</p>
                </div>
              </div>
            </div>
            {/* Right side Novel Info */}
            <div className=" mt-5 flex flex-col gap-3 justify-start w-[100%]">
              {/* Name of the novel */}
              <div className="flex flex-row gap-4 items-center justify-start flex-wrap ">
                <h3 className="text-xl font-semibold lg:text-4xl lg:font-bold border  ">
                  {novelObject.name}
                </h3>
              </div>
              {/* Description of the novel */}
              <div className="flex flex-row gap-4 items-center justify-start flex-wrap ">
                <p className="text-justify">{novelObject.description}</p>
              </div>
              {/* Latest Chapter */}
              <div className="flex flex-row gap-4 items-center justify-start flex-wrap ">
                <h3 className="text-xl font-semibold">Latest Chapter: </h3>
                <p className="text-justify">{novelObject.lastReleased}</p>
              </div>
            </div>
          </div>

          {/* Novel Chapter */}
          <div className="flex flex-row justify-between border border-b-slate-500">
            <h3 className="text-2xl font-semibold border border-b-black">
              Chapter List
            </h3>
          </div>
        </div>
        {/* Show chapter in two column */}
        <div className="flex flex-col p-5 lg:flex-row md:flex-row justify-between mt-5">
          <div className="flex flex-col gap-3 justify-start w-[100%] lg:w-[50%] md:w-[100%] sm:w-[100%]">
            {leftChapter.map((chapter, i) => (
              <div
                key={i}
                className="flex flex-row gap-4 items-center justify-start flex-wrap "
              >
                <h3 className="text-xl font-lg cursor-pointer">{chapter}</h3>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-3 justify-start w-[100%] lg:w-[50%] md:w-[100%] sm:w-[100%]">
            {rightChapter.map((chapter, i) => (
              <div
                key={i}
                className="flex flex-row gap-4 items-center justify-start flex-wrap "
              >
                <h3 className="text-xl font-lg cursor-pointer">{chapter}</h3>
              </div>
            ))}
          </div>
        </div>
        <TablePagination />
      </div>
    </>
  );
};

export default Novel;
