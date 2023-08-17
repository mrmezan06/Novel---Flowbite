import { Link } from 'react-router-dom';
const Pagination = ({
  chapterList,
  nextChapter,
  prevChapter,
  currentChapter,
}) => {
  return (
    <>
      <div className="flex mt-10 justify-center align-bottom">
        {/* <!-- Previous Button --> */}
        <Link
          to={
            prevChapter === null
              ? `/chapter?id=${currentChapter._id}`
              : `/chapter?id=${prevChapter._id}`
          }
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
        </Link>
        <div className="flex flex-col 2xl:flex-row xl:flex-row lg:flex-row md:flex-row sm:flex-col">
          {chapterList &&
            chapterList.map((chapter) => (
              <a
                key={chapter._id}
                href={`/chapter?id=${chapter._id}`}
                className={`flex flex-row w-auto py-1 px-2 mr-3 rounded-md ${
                  currentChapter.chapter === chapter.chapter
                    ? 'bg-gray-500'
                    : 'bg-gray-700'
                }  text-white border-b border-gray-100 hover:bg-gray-700 hover:text-gray-500 md:border-0 md:hover:text-white-700 dark:text-white dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent`}
              >
                {chapter.chapter}
              </a>
            ))}
        </div>
        <a
          href={
            nextChapter === null
              ? `/chapter?id=${currentChapter._id}`
              : `/chapter?id=${nextChapter._id}`
          }
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
