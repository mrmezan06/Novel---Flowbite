import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getNovel } from '../action/novelAction';
import moment from 'moment';
import SingleNovelChapterPagination from '../components/SingleNovelChapterPagination';

const Novel = () => {
  const location = useLocation();
  const id = location.search.split('=')[1];
  const navigate = useNavigate();

  const { novel, chapters, latestChapters, total, pagination } = useSelector(
    (state) => state.novel
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (!id) {
      navigate('/', { replace: true });
    }

    if (id && !novel) {
      dispatch(getNovel(id));
    }
  }, [id, navigate, dispatch, novel]);

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
          {novel && (
            <div className="flex flex-col p-5 lg:flex-row md:flex-col justify-between">
              {/* Left side Novel Info and Cover */}
              <div className="flex flex-col gap-5 mr-5 justify-between">
                <div className="mt-5 w-[100%] lg:w-[100%] md:w-[100%] sm:w-[100%] cursor-pointer">
                  <img
                    className="h-[450px] w-[100%]"
                    src={novel.coverUrl}
                    alt={novel.name}
                  />
                </div>
                <div className="mt-10 flex flex-col gap-3 justify-between w-[100%] lg:w-[50%] md:w-[100%] sm:w-[100%]">
                  <div className="flex flex-row gap-4 items-center justify-start flex-wrap">
                    <h3 className="text-xl font-semibold">Author:</h3>
                    <p className="text-justify">{novel.author}</p>
                  </div>
                  <div className="flex flex-row gap-4 items-center justify-start flex-wrap">
                    <h3 className="text-xl font-semibold">
                      Alternative names:
                    </h3>
                    <p className="text-justify">{novel.alternativeName}</p>
                  </div>
                  <div className="flex flex-row gap-4 items-center justify-start flex-wrap ">
                    <h3 className="text-xl font-semibold">Genre:</h3>
                    <p className="text-justify text-lg">
                      {novel.category.join(', ')}
                    </p>
                  </div>
                  <div className="flex flex-row gap-4 items-center justify-start flex-wrap ">
                    <h3 className="text-xl font-semibold">Status:</h3>
                    <p className="text-justify text-lg">{novel.status}</p>
                  </div>
                </div>
              </div>
              {/* Right side Novel Info */}
              <div className=" mt-5 flex flex-col gap-3 justify-start w-[100%]">
                {/* Name of the novel */}
                <div className="flex flex-row gap-4 items-center justify-start flex-wrap ">
                  <h3 className="text-xl font-semibold lg:text-4xl lg:font-bold border  ">
                    {novel.name}
                  </h3>
                </div>
                {/* Description of the novel */}
                <div className="flex flex-row gap-4 items-center justify-start flex-wrap ">
                  <p className="text-justify font-medium">
                    {novel.description}
                  </p>
                </div>
                {/* Latest Chapter */}
                <div className="flex flex-col gap-4 justify-start flex-wrap ">
                  <h3 className="text-2xl font-bold">Latest Chapter: </h3>
                  {latestChapters &&
                    latestChapters.map((chapter, i) => (
                      <p
                        key={chapter._id}
                        className="text-justify text-xl font-medium cursor-pointer"
                        onClick={() => navigate(`/chapter?id=${chapter._id}`)}
                      >
                        {i + 1}. Chapter - {chapter.chapter}
                      </p>
                    ))}
                </div>
              </div>
            </div>
          )}

          {/* Novel Chapter */}
          <div className="flex flex-row justify-between border border-b-slate-500">
            <h3 className="text-2xl font-semibold border border-b-black">
              Chapter List
            </h3>
          </div>
        </div>
        {/* Show chapter in two column */}
        <div className="relative overflow-x-auto mb-5 shadow-md sm:rounded-lg w-[80%]">
          <table className="w-full text-sm text-left text-gray-500   dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Chapter No.
                </th>
                <th scope="col" className="px-6 py-3">
                  Chapter Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Created At
                </th>
              </tr>
            </thead>
            <tbody>
              {chapters &&
                chapters.map((chapter) => (
                  <tr
                    key={chapter._id}
                    className="bg-white border-b cursor-pointer dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    onClick={() => navigate(`/chapter?id=${chapter._id}`)}
                  >
                    <th
                      scope="row"
                      className="px-6 py-4  font-semibold hover:text-black dark:text-white"
                    >
                      {chapter.chapter}
                    </th>
                    <td className="px-6 py-4 font-semibold hover:text-black dark:text-white">
                      {chapter.title}
                    </td>
                    <td className="px-6 py-4 font-semibold hover:text-black dark:text-white">
                      {moment(chapter.createdAt).format('DD-MM-yy hh:mm:ss A')}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        {chapters && (
          <SingleNovelChapterPagination
            total={total}
            pagination={pagination}
            novelId={id}
          />
        )}
      </div>
    </>
  );
};

export default Novel;
