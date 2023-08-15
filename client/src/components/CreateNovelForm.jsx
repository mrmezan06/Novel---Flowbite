import { useState } from 'react';
import { genreList } from '../utility/itemList';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import axios from 'axios';
import { BASE_URL } from '../constant/baseUrl';
const CreateNovelForm = () => {
  const [category, setCategory] = useState([]);
  const [name, setName] = useState('');
  const [coverUrl, setCoverUrl] = useState('');
  const [author, setAuthor] = useState('');
  const [alternativeName, setAlternativeName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => state.login);

  const handleCreate = async (e) => {
    e.preventDefault();
    setLoading(true);

    const config = {
      headers: {
        'Content-Type': 'application/json',
        authorization: user?.accessToken,
      },
    };

    await axios
      .post(
        `${BASE_URL}/api/novel`,
        {
          name,
          coverUrl,
          category,
          author,
          alternativeName,
          description,
        },
        config
      )
      .then((res) => {
        setName('');
        setCoverUrl('');
        setCategory([]);
        setAuthor('');
        setAlternativeName('');
        setDescription('');
        toast.success('Novel added successfully');
        setLoading(false);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        setLoading(false);
      });
  };

  return (
    <>
      <section className="bg-white border border-slate-900 mt-3 rounded-md  px-10 shadow-lg shadow-slate-600 dark:bg-gray-900 ">
        <div className="py-2 px-4 mx-10 max-w-2xl lg:py-16">
          <h2 className="mb-4 text-center text-xl font-bold text-gray-900 dark:text-white">
            Create Novel
          </h2>
          <form onSubmit={handleCreate}>
            <div className="grid gap-3 sm:grid-cols-2 sm:gap-2">
              <div className="sm:col-span-2">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Novel Name *
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Type novel name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="cover"
                  classcover="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Novel Cover (Optional)
                </label>
                <input
                  type="text"
                  name="cover"
                  id="cover"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Type novel cover url eg: https://example.com/cover.jpg"
                  value={coverUrl}
                  onChange={(e) => setCoverUrl(e.target.value)}
                />
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="category"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Category *
                </label>
                <input
                  type="text"
                  name="category"
                  id="category"
                  value={category.join(', ')}
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
                  Available Category
                </label>
                <select
                  id="category"
                  onChange={(e) => {
                    // check the category already exist or not
                    if (category.includes(e.target.value)) {
                      // remove the category from the list
                      setCategory(
                        category.filter((item) => item !== e.target.value)
                      );
                    } else {
                      // add the category to the list
                      setCategory([...category, e.target.value]);
                    }
                  }}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                >
                  <option defaultValue="">Select category</option>
                  {genreList.map((genre, i) => (
                    <option key={i} value={genre}>
                      {genre}
                    </option>
                  ))}
                </select>
              </div>
              <div className="w-full">
                <label
                  htmlFor="author"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Author (Optional)
                </label>
                <input
                  type="text"
                  name="author"
                  id="author"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Author Name eg: Silkworm"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                />
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="alternativeName"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Alternative Name (Optional)
                </label>
                <input
                  type="text"
                  name="alternativeName"
                  id="alternativeName"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Type alternative name eg: BTTH"
                  value={alternativeName}
                  onChange={(e) => setAlternativeName(e.target.value)}
                />
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="description"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Description (Optional)
                </label>
                <textarea
                  id="description"
                  rows="4"
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Novel description here"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-gray-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
                disabled={loading}
              >
                Create
              </button>
            </div>
          </form>
          <div className="flex flex-row items-center justify-center mt-5">
            <p className="px-5 py-2.5 text-sm text-gray-900 dark:text-white">
              Want to add a new chapter?
            </p>
            <a
              href="/chapter/add"
              className=" px-5 py-2.5 text-sm font-bold text-center text-black "
            >
              Add Chapter
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default CreateNovelForm;
