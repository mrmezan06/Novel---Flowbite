import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getNovels } from '../action/novelAction';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../constant/baseUrl';
import NovelListPagination from './NovelListPagination';
import Spinner from './Spinner';

const NovelList = ({ loading, error, novels, totalNovel, pagination }) => {
  const { user } = useSelector((state) => state.login);

  const navigate = useNavigate();

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
          toast.success('Hot 🔥 List Updated');
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
          toast.warning('Hot 🔥 List Updated and Removed One');
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
          toast.success('Novel is completed');
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
          toast.warning('Novel is ongoing');
        })
        .catch((err) => {
          toast.error(err);
        });
    }
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
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
                    O/C
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Delete
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
                        onClick={() => navigate(`/novel/${novel._id}`)}
                      >
                        {novel.name}
                      </th>
                      <td
                        className="px-5 py-3"
                        onClick={() => navigate(`/novel/${novel._id}`)}
                      >
                        {novel?.category?.join(', ')}
                      </td>
                      <td
                        className="px-5 py-3"
                        onClick={() => navigate(`/novel/${novel._id}`)}
                      >
                        {novel?.lastReleased}
                      </td>
                      <td
                        className="px-5 py-3"
                        onClick={() => navigate(`/novel/${novel._id}`)}
                      >
                        {novel?.totalChapter}
                      </td>
                      <td
                        className="px-5 py-3"
                        onClick={() => navigate(`/novel/${novel._id}`)}
                      >
                        {novel?.status}
                      </td>
                      <td className="px-5 py-3">
                        {novel?.hotNovel ? (
                          <span
                            className="bg-red-500 text-white py-2 px-3"
                            onClick={() => handleUpdate(novel._id, 'unhot')}
                            disabled={loading}
                          >
                            Remove
                          </span>
                        ) : (
                          <span
                            className="bg-red-700 text-white py-2 px-3"
                            onClick={() => handleUpdate(novel._id, 'hot')}
                            disabled={loading}
                          >
                            Make
                          </span>
                        )}
                      </td>
                      <td className="px-5 py-3">
                        {novel?.status === 'Ongoing' ? (
                          <span
                            className="bg-green-500 text-white py-2 px-3"
                            onClick={() => handleUpdate(novel._id, 'complete')}
                            disabled={loading}
                          >
                            Completed
                          </span>
                        ) : (
                          <span
                            className="bg-red-700 text-white py-2 px-3"
                            onClick={() => handleUpdate(novel._id, 'ongoing')}
                            disabled={loading}
                          >
                            Ongoing
                          </span>
                        )}
                      </td>
                      <td className="px-5 py-3 inline-flex gap-1">
                        <span
                          className="bg-red-700 text-white py-2 px-3"
                          onClick={() => {
                            navigate(`/novel/update/${novel._id}`);
                          }}
                          disabled={loading}
                        >
                          Update
                        </span>
                        <span
                          className="bg-red-700 text-white py-2 px-3"
                          onClick={() => {}}
                          disabled={loading}
                        >
                          Delete
                        </span>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <NovelListPagination total={totalNovel} pagination={pagination} />
          </div>
        </>
      )}
    </>
  );
};

export default NovelList;
