import React from 'react';
import TablePagination from './TablePagination';
import { novelObjectlList } from '../utility/itemList';

const Completed = () => {
  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Novel Name
              </th>
              <th scope="col" className="px-6 py-3">
                Category
              </th>
              <th scope="col" className="px-6 py-3">
                Total Chapter
              </th>
              <th scope="col" className="px-6 py-3">
                Updated At
              </th>
              {/* <th scope="col" className="px-6 py-3">
                <span className="sr-only">Action</span>
              </th> */}
            </tr>
          </thead>
          <tbody>
            {novelObjectlList.map((novel) => (
              <tr
                key={novel.id}
                className="bg-white border-b cursor-pointer dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {novel.name}
                </th>
                <td className="px-6 py-4">{novel.category}</td>
                <td className="px-6 py-4">{novel.totalChapter}</td>
                <td className="px-6 py-4">{novel.updatedAt}</td>
                {/* <td className="px-6 py-4 text-right">
                  <a
                    href="#!"
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Read
                  </a>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
        <TablePagination />
      </div>
    </>
  );
};

export default Completed;
