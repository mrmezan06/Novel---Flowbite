import React from 'react';
import { chapterList } from '../utility/itemList';
const Pagination = () => {
  const [current, setCurrent] = React.useState('Chapter 1');

  return (
    <>
      <div className="flex justify-center align-bottom">
        {/* <!-- Previous Button --> */}
        <a
          href="#!"
          className="flex items-center justify-center py-1 px-3 h-8 mr-3 text-sm font-medium bg-gray-700 text-white border border-gray-300 rounded-lg hover:bg-gray-700 hover:text-gray-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          <svg
            className="w-3.5 h-3.5 mr-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 5H1m0 0 4 4M1 5l4-4"
            />
          </svg>
          Previous
        </a>
        <div>
          <button
            id="dropdownNavbarLink"
            data-dropdown-toggle="chapterDropdownMenu"
            className="flex items-center justify-between w-auto py-1 px-2 mr-3 rounded-md bg-gray-700  text-white border-b border-gray-100 hover:bg-gray-700 hover:text-gray-500 md:border-0 md:hover:text-white-700 dark:text-white dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
          >
            {current}
            <svg
              className="w-2.5 h-2.5 ml-2.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </button>

          <div
            id="chapterDropdownMenu"
            className="z-10 hidden font-normal bg-gray-700 divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
          >
            <ul
              className="py-2 text-sm text-gray-700 dark:text-gray-400"
              aria-labelledby="dropdownLargeButton"
            >
              {chapterList.map((chapter) => (
                <li
                  onClick={() => {
                    setCurrent(chapter);
                  }}
                  className="block px-4 py-2 text-center text-white cursor-pointer hover:bg-gray-500 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  {chapter}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <a
          href="#!"
          className="flex items-center justify-center py-1 px-3 h-8 mr-3 text-sm font-medium bg-gray-700 text-white border border-gray-300 rounded-lg hover:bg-gray-700 hover:text-gray-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          Next
          <svg
            className="w-3.5 h-3.5 ml-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </a>
      </div>
    </>
  );
};

export default Pagination;
