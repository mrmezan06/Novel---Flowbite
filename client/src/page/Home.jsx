import React from 'react';
import Gallery from '../components/Gallery';
import Latest from '../components/Latest';
import Completed from '../components/Completed';
import { genreList } from '../utility/itemList';

const Home = () => {
  const current = 'All';

  return (
    <>
      <div className="container mt-10 mb-10">
        <div
          id="hot"
          className="flex flex-row justify-between border border-b-slate-700"
        >
          <h3 className="text-2xl font-semibold border border-b-black">
            Hot Novel
          </h3>
          <div className="border border-b-black">
            <button
              id="dropdownNavbarLink"
              data-dropdown-toggle="chapterDropdownMenu"
              className="flex items-center justify-between gap-20 w-auto py-1 px-2 mr-3  bg-white  text-gray-700  hover:bg-white hover:text-gray-700 md:border-0 md:hover:text-white-700 dark:text-white dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
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
                {genreList.map((genre, i) => (
                  <li key={i}>
                    <a
                      href={`/genre?category=${genre}`}
                      className="block px-4 py-2 text-center text-white cursor-pointer hover:bg-gray-500 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      {genre}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <Gallery />
        <div
          id="latest"
          className="flex flex-row justify-between border border-b-slate-700"
        >
          <h3 className="text-2xl font-semibold border border-b-black">
            Latest Release
          </h3>
        </div>
        <Latest />
        <div
          id="completed"
          className="flex flex-row justify-between border border-b-slate-700"
        >
          <h3 className="text-2xl font-semibold border border-b-black">
            Completed Novel
          </h3>
        </div>
        <Completed />
      </div>
    </>
  );
};

export default Home;
