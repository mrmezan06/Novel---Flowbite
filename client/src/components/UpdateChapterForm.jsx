import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { toast } from 'react-toastify';
import axios from 'axios';
import { BASE_URL } from '../constant/baseUrl';
import { useLocation } from 'react-router-dom';
import { getChapter } from '../action/chapterAction';

const UpdateChapterForm = ({ novels }) => {
  const [novelName, setNovelName] = useState('');
  const [title, setTitle] = useState('');
  const [chapterNumber, setChapterNumber] = useState(0);
  const [novelId, setNovelId] = useState('');
  const [content, setContent] = useState('');

  const { loading, error, chapter, novel } = useSelector(
    (state) => state.chapter
  );
  const { user } = useSelector((state) => state.login);

  const dispatch = useDispatch();

  const location = useLocation();
  const chapterId = location.pathname.split('/')[3];
  useEffect(() => {
    if (loading) {
      toast.info('Loading chapter data');
    }

    if (error) {
      toast.error(error);
    }

    if (chapterId && !chapter) {
      dispatch(getChapter(chapterId));
    }

    // console.log(chapterId);

    // console.log(chapter);
    if (chapter) {
      setNovelName(novel.name);
      setNovelId(chapter.novelId);
      setTitle(chapter.title);
      setChapterNumber(chapter.chapter);
      setContent(chapter.content.join('<>'));
    }
  }, [chapterId, dispatch, chapter, novel, loading, error]);

  const handleUpdateChapter = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        authorization: user?.accessToken,
      },
    };

    const contentArray = content.split('<>');

    await axios
      .put(
        `${BASE_URL}/api/chapter/${chapterId}`,
        { novelId, title, content: contentArray, chapter: chapterNumber },
        config
      )
      .then((res) => {
        toast.success(res.data.message);
        dispatch('CHAPTER_RESET');
        dispatch('CHAPTER_ALL_RESET');
        // Dashboard page
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  return (
    <>
      <section className="bg-white border border-slate-900 mt-5 rounded-md px-10 shadow-lg shadow-slate-600 dark:bg-gray-900 ">
        <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
          <h2 className="mb-4 text-xl text-center font-bold text-gray-900 dark:text-white">
            Update Chapter
          </h2>
          <form onSubmit={handleUpdateChapter}>
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
              <div className="sm:col-span-2">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Chapter Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Type chapter name"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="novel"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Novel Name
                </label>
                <input
                  type="text"
                  name="novel"
                  id="novel"
                  value={novelName}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Choose from below list"
                  disabled
                />
              </div>

              <div>
                <label
                  htmlFor="category"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Available Novel
                </label>
                <select
                  id="category"
                  disabled
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                >
                  <option defaultValue="">Select novel</option>
                  {novels &&
                    novels.length > 0 &&
                    novels.map((nov, i) => (
                      <option key={i} value={nov._id}>
                        {nov.name}
                      </option>
                    ))}
                  {novels && novels.length === 0 && (
                    <option value="">No novel available</option>
                  )}
                </select>
              </div>
              <div className="w-full">
                <label
                  htmlFor="chapterNumber"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Chapter Number
                </label>
                <input
                  type="number"
                  name="chapterNumber"
                  id="chapterNumber"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Type chapter number"
                  value={chapterNumber === 0 ? '' : chapterNumber}
                  required
                  onChange={(e) => {
                    setChapterNumber(Number(e.target.value));
                  }}
                  disabled
                />
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="chapterContent"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Chapter Content (Paragraphs are separated by <b>&lt;&gt;</b>)
                </label>
                <textarea
                  id="chapterContent"
                  name="chapterContent"
                  rows="6"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Type chapter content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                ></textarea>
              </div>
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-gray-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
              >
                Update
              </button>
            </div>
          </form>

          <div className="flex flex-row items-center justify-center mt-5">
            <p className="px-5 py-2.5 text-sm text-gray-900 dark:text-white">
              Want to add a new novel?
            </p>
            <a
              href="/novel/create"
              className=" px-5 py-2.5 text-sm font-bold text-center text-black "
            >
              Create Novel
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default UpdateChapterForm;
