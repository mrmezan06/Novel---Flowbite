import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import LatestPagination from './LatestPagination';
import { useEffect } from 'react';
import { getNovelsByCategory } from '../action/novelAction';
const Category = ({ category }) => {
  const { novels, total, pagination } = useSelector((state) => state.category);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getNovelsByCategory(category));
  }, [category, dispatch]);

  return (
    <>
      <div className="relative overflow-x-auto mb-5 shadow-md sm:rounded-lg">
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
                Last released
              </th>
              <th scope="col" className="px-6 py-3">
                Total Chapter
              </th>
              <th scope="col" className="px-6 py-3">
                Updated At
              </th>
            </tr>
          </thead>
          <tbody>
            {novels &&
              novels.map((novel) => (
                <tr
                  key={novel._id}
                  className="bg-white border-b cursor-pointer dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  onClick={() => navigate(`/novel?id=${novel._id}`)}
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {novel.name}
                  </th>
                  <td className="px-6 py-4">{novel.category.join(', ')}</td>
                  <td className="px-6 py-4">{novel.lastReleased}</td>
                  <td className="px-6 py-4">{novel.totalChapter}</td>
                  <td className="px-6 py-4">
                    {moment(novel.updatedAt).format('DD-MM-YY HH:mm A')}
                  </td>
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
            {novels && novels.length === 0 && (
              <tr className="bg-white border-b cursor-pointer dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  No
                </th>
                <td className="px-6 py-4">Novel</td>
                <td className="px-6 py-4">Found</td>
                <td className="px-6 py-4">In The</td>
                <td className="px-6 py-4">Database!</td>
                {/* <td className="px-6 py-4 text-right">
                      <a
                        href="#!"
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        Read
                      </a>
                    </td> */}
              </tr>
            )}
          </tbody>
        </table>
        {novels && <LatestPagination total={total} pagination={pagination} />}
      </div>
    </>
  );
};

export default Category;
