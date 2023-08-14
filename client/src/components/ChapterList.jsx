import React from 'react';
import { chapterObject } from '../utility/itemList';
import TablePagination from './TablePagination';

const ChapterList = () => {
  return (
    <>
      <div className="relative overflow-x-auto mb-5 shadow-md sm:rounded-lg w-[80%]">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Chapter No.
              </th>
              <th scope="col" className="px-6 py-3">
                Chapter Name
              </th>
              <th scope="col" className="px-6 py-3">
                Novel Name
              </th>
              <th scope="col" className="px-6 py-3">
                Created At
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Change
              </th>
            </tr>
          </thead>
          <tbody>
            {chapterObject.map((chapter) => (
              <tr
                key={chapter.id}
                className="bg-white border-b cursor-pointer dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {chapter.chapter}
                </th>
                <td className="px-6 py-4">{chapter.title}</td>
                <td className="px-6 py-4">{chapter.novel}</td>
                <td className="px-6 py-4">{chapter.createdAt}</td>
                <td className={`px-6 py-4 font-bold`}>{chapter.status}</td>

                <td className="px-6 py-4 flex flex-row gap-1">
                  <span className="bg-blue-600 text-white py-2 px-3">
                    Draft
                  </span>
                  <span className="bg-green-500 text-white py-2 px-3">
                    Publish
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <TablePagination />
      </div>
    </>
  );
};

export default ChapterList;
