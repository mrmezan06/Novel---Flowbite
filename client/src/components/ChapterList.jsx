import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getAllChapters } from '../action/chapterAction';
import moment from 'moment';
import axios from 'axios';
import { BASE_URL } from '../constant/baseUrl';
import { useNavigate } from 'react-router-dom';
import ChapterListPagination from './ChapterListPagination';

const ChapterList = () => {
  const { loading, error, chapters, total, pagination } = useSelector(
    (state) => state.allChapters
  );

  const { user } = useSelector((state) => state.login);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (!chapters) {
      dispatch(getAllChapters());
    }
    if (error) {
      toast.error(error);
    }
  }, [loading, error, chapters, dispatch]);

  const handleUpdate = async (id, task) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        authorization: user?.accessToken,
      },
    };
    if (task === 'p2d') {
      const status = 'Draft';

      await axios
        .put(`${BASE_URL}/api/chapter/${id}`, { status }, config)
        .then((res) => {
          dispatch(getAllChapters());
          toast.success('Chapter is now in Draft');
        })
        .catch((err) => {
          toast.error(err);
        });
    }

    if (task === 'd2p') {
      const status = 'Published';

      await axios
        .put(`${BASE_URL}/api/chapter/${id}`, { status }, config)
        .then((res) => {
          dispatch(getAllChapters());
          toast.warning('Chapter is now Published');
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
            {chapters &&
              chapters.map((chapter) => (
                <tr
                  key={chapter._id}
                  className="bg-white border-b cursor-pointer dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {chapter.chapter}
                  </th>
                  <td className="px-6 py-4">{chapter.title}</td>
                  <td className="px-6 py-4">{chapter.novelId?.name}</td>
                  <td className="px-6 py-4">
                    {moment(chapter.createdAt).format('DD-MM-yy hh:mm:ss A')}
                  </td>
                  <td className={`px-6 py-4 font-bold`}>{chapter.status}</td>

                  <td className="px-6 py-4 flex flex-row gap-1">
                    {chapter.status === 'Draft' ? (
                      <span
                        className="bg-green-700 text-white py-2 px-3"
                        onClick={() => handleUpdate(chapter._id, 'd2p')}
                        disabled={loading}
                      >
                        Publish
                      </span>
                    ) : (
                      <span
                        className="bg-blue-700 text-white py-2 px-3"
                        onClick={() => handleUpdate(chapter._id, 'p2d')}
                        disabled={loading}
                      >
                        Draft
                      </span>
                    )}
                    <span
                      className="bg-red-700 text-white py-2 px-3"
                      onClick={() => {
                        navigate(`/chapter/update/${chapter._id}`);
                      }}
                    >
                      Update
                    </span>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        {chapters && (
          <ChapterListPagination total={total} pagination={pagination} />
        )}
      </div>
    </>
  );
};

export default ChapterList;
