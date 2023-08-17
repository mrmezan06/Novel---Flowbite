import { useLocation, useNavigate } from 'react-router-dom';
import Pagination from '../components/Pagination';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getChapter } from '../action/chapterAction';
// import { Spinner } from 'flowbite-react';
import Spinner from '../components/Spinner';

const Chapter = () => {
  const location = useLocation();
  const id = location.search.split('=')[1];
  const navigate = useNavigate();

  const { loading, chapter, novel, prevChapter, nextChapter, chapterList } =
    useSelector((state) => state.chapter);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!id) {
      navigate('/', { replace: true });
    }

    if (id && !chapter) {
      dispatch(getChapter(id));
    }
  }, [id, navigate, dispatch, chapter]);

  return (
    <>
      {loading ? (
        <>
          <Spinner />
        </>
      ) : (
        <>
          <div>
            {novel && (
              <h1
                onClick={() => navigate(`/novel/${novel._id}`)}
                className="mb-4 mt-5 text-3xl backdrop-blur select-none  font-extrabold leading-none tracking-tight cursor-pointer text-white md:text-3xl lg:text-4xl xl:text-4xl 2xl:text-4xl dark:text-white text-center"
                style={{
                  textShadow:
                    '0 0 5px blue, 0 0 15px blue, 0 0 20px blue, 0 0 40px blue, 0 0 60px blue, 0 0 10px blue, 0 0 98px blue',
                  color: 'white',
                }}
              >
                {novel.name}
              </h1>
            )}
            {chapter && (
              <h4 className="mb-4 text-xl select-none font-semibold leading-none tracking-tight text-white md:text-2xl lg:text-2xl dark:text-white text-center">
                {chapter.title}
              </h4>
            )}
            {chapter &&
              chapter.content.map((content, index) => (
                <div className="container ml-auto" key={index}>
                  <p className="max-w-[1080px] text-justify text-gray-400 font-semibold m-5 leading-7">
                    {content}
                    <br />
                  </p>
                </div>
              ))}

            {/* Pagination */}
            {chapter && (
              <Pagination
                chapterList={chapterList}
                prevChapter={prevChapter}
                nextChapter={nextChapter}
                currentChapter={chapter}
              />
            )}
          </div>
        </>
      )}
    </>
  );
};

export default Chapter;
