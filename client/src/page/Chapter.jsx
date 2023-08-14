import { useLocation, useNavigate } from 'react-router-dom';
import Pagination from '../components/Pagination';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getChapter } from '../action/chapterAction';

const Chapter = () => {
  const location = useLocation();
  const id = location.search.split('=')[1];
  const navigate = useNavigate();

  const { chapter, novel, prevChapter, nextChapter, chapterList } = useSelector(
    (state) => state.chapter
  );

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
      {novel && (
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white text-center">
          {novel.name}
        </h1>
      )}
      {chapter && (
        <h4 className="mb-4 text-xl font-semibold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-2xl dark:text-white text-center">
          {chapter.title}
        </h4>
      )}
      {chapter &&
        chapter.content.map((content, index) => (
          <p className="max-w-[1080px] text-justify m-5" key={index}>
            {content}
            <br />
          </p>
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
    </>
  );
};

export default Chapter;
