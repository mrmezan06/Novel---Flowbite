import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getLatestNovels } from '../action/novelAction';

const LatestPagination = ({ total, pagination }) => {
  const { startPage, endPage, page, pages } = pagination;
  const [currentPage, setCurrentPage] = useState(page);

  const dispatch = useDispatch();

  const handlePageChange = (changePage) => {
    if (changePage < 1) {
      setCurrentPage(1);
      dispatch(getLatestNovels(1));
    }
    if (changePage > pages) {
      setCurrentPage(pages);
      dispatch(getLatestNovels(pages));
    }
    if (changePage > 0 && changePage <= pages) {
      setCurrentPage(changePage);
      dispatch(getLatestNovels(changePage));
    }
  };

  const step = 1;

  const arrayRange = (start, stop, step) =>
    Array.from(
      { length: (stop - start) / step + 1 },
      (value, index) => start + index * step
    );

  return (
    <>
      <nav
        className="flex items-center justify-center pt-4 lg:justify-between md:justify-between 2xl:justify-between"
        aria-label="Table navigation"
      >
        <span className="text-sm font-normal text-gray-500 dark:text-gray-400 justify-center gap-2 hidden lg:flex md:flex 2xl:flex ">
          Showing{' '}
          <span className="font-semibold text-gray-900 dark:text-white">
            {total < 1 ? 0 : 1}-{total < 10 ? total : 10}
          </span>{' '}
          of{' '}
          <span className="font-semibold text-gray-900 dark:text-white">
            {total}
          </span>
        </span>
        <ul className="inline-flex -space-x-px text-sm h-8">
          <li
            onClick={() => handlePageChange(currentPage - 1)}
            className="cursor-pointer flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            Previous
          </li>

          {arrayRange(startPage, endPage, step).map((i) => (
            <li
              onClick={() => handlePageChange(i)}
              key={i}
              className={`
             ${
               page === i
                 ? 'cursor-pointer flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white'
                 : 'cursor-pointer flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
             }
              `}
            >
              {i}
            </li>
          ))}

          <li
            onClick={() => handlePageChange(currentPage + 1)}
            className="cursor-pointer flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            Next
          </li>
        </ul>
      </nav>
    </>
  );
};

export default LatestPagination;
