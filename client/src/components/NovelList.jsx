import React, { useEffect } from 'react';
import TablePagination from './TablePagination';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getNovels } from '../action/novelAction';
import axios from 'axios';
import { BASE_URL } from '../constant/baseUrl';

const NovelList = () => {
  const { loading, error, novels } = useSelector((state) => state.novels);
  const { user } = useSelector((state) => state.login);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!novels) {
      dispatch(getNovels());
    }

    if (error) {
      toast.error(error);
    }
  }, [loading, error, novels, dispatch]);

  const handleUpdate = async (id, task) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        authorization: user?.accessToken,
      },
    };
    if (task === 'hot') {
      const hotNovel = true;

      await axios
        .put(`${BASE_URL}/api/novel/${id}`, { hotNovel }, config)
        .then((res) => {
          dispatch(getNovels());
          toast.success('Novel is now in the Hot 🔥');
        })
        .catch((err) => {
          toast.error(err);
        });
    }

    if (task === 'unhot') {
      const hotNovel = false;

      await axios
        .put(`${BASE_URL}/api/novel/${id}`, { hotNovel }, config)
        .then((res) => {
          dispatch(getNovels());
          toast.warning('Novel is removed from the Hot');
        })
        .catch((err) => {
          toast.error(err);
        });
    }

    if (task === 'complete') {
      const status = 'Completed';
      await axios
        .put(`${BASE_URL}/api/novel/${id}`, { status }, config)
        .then((res) => {
          dispatch(getNovels());
          toast.success('Novel is now Completed');
        })
        .catch((err) => {
          toast.error(err);
        });
    }

    if (task === 'ongoing') {
      const status = 'Ongoing';
      await axios
        .put(`${BASE_URL}/api/novel/${id}`, { status }, config)
        .then((res) => {
          dispatch(getNovels());
          toast.warning('Novel is now Ongoing');
        })
        .catch((err) => {
          toast.error(err);
        });
    }
  };

  return (
    <>
      <div className="relative overflow-x-auto mb-5 shadow-md sm:rounded-lg w-[80%]">
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
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Hot Novel
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {novels &&
              novels.map((novel) => (
                <tr
                  key={novel._id}
                  className="bg-white border-b cursor-pointer dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {novel.name}
                  </th>
                  <td className="px-6 py-4">{novel?.category?.join(', ')}</td>
                  <td className="px-6 py-4">{novel?.lastReleased}</td>
                  <td className="px-6 py-4">{novel?.totalChapter}</td>
                  <td className="px-6 py-4">{novel?.status}</td>
                  <td className="px-6 py-4">
                    {/* TODO: Update Functionality */}
                    {novel?.hotNovel ? (
                      <span
                        className="bg-green-500 text-white py-2 px-3"
                        onClick={() => handleUpdate(novel._id, 'unhot')}
                        disabled={loading}
                      >
                        Remove Hot
                      </span>
                    ) : (
                      <span
                        className="bg-red-700 text-white py-2 px-3"
                        onClick={() => handleUpdate(novel._id, 'hot')}
                        disabled={loading}
                      >
                        Make Hot
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 flex flex-row gap-1">
                    {/* TODO: Update Functionality */}
                    {novel?.status === 'Ongoing' ? (
                      <span
                        className="bg-green-500 text-white py-2 px-3"
                        onClick={() => handleUpdate(novel._id, 'complete')}
                        disabled={loading}
                      >
                        Make Completed
                      </span>
                    ) : (
                      <span
                        className="bg-red-700 text-white py-2 px-3"
                        onClick={() => handleUpdate(novel._id, 'ongoing')}
                        disabled={loading}
                      >
                        Make Ongoing
                      </span>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        {/* TODO: Pagination need to handle */}
        <TablePagination />
      </div>
    </>
  );
};

export default NovelList;
