import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import NovelList from '../components/NovelList';
import { genreList } from '../utility/itemList';
import ChapterList from '../components/ChapterList';
import { useNavigate } from 'react-router-dom';
import { logout } from '../action/userAction';

const Dashboard = () => {
  const [current, setCurrent] = React.useState('All');
  const { loading, error, user } = useSelector((state) => state.login);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    toast.success('Logout successfully');
    navigate('/admin/login', { replace: true });
  };

  useEffect(() => {
    if (loading) {
      toast.info('Loading...');
    }
    if (error) {
      toast.error(error);
    }
    if (!user) {
      navigate('/admin/login', { replace: true });
    }
  }, [loading, error, user, navigate]);

  return (
    <>
      <div className="flex flex-col justify-center mt-10">
        <img
          className="w-20 h-20 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500"
          src={user?.imageUrl}
          alt="Bordered avatar"
        />
      </div>
      <div className="flex flex-col justify-center mt-5 mb-10">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {user?.name} -{' '}
          {user?.roles.length === 2 ? user?.roles[1] : user?.roles[0]}
        </h1>
      </div>

      {user?.roles.includes('ADMIN') ? (
        <>
          <div className="flex flex-col gap-1 justify-center xl:flex-row lg:flex-row md:flex-row">
            <span
              className="bg-blue-600 text-white py-2 px-3 cursor-pointer"
              onClick={() => navigate('/create/novel')}
            >
              Create Novel
            </span>
            <span className="bg-red-700 text-white py-2 px-3 cursor-pointer">
              Total Novel : 10
            </span>
            <span
              className="bg-green-500 text-white py-2 px-3 cursor-pointer"
              onClick={() => navigate('/add/chapter')}
            >
              Add Chapter
            </span>
            <span className="bg-red-700 text-white py-2 px-3 cursor-pointer">
              Total Chapter : 100
            </span>
            <span
              className="bg-yellow-900 text-white py-2 px-3 cursor-pointer"
              onClick={handleLogout}
            >
              Logout
            </span>
          </div>

          {/* Novel List */}
          <div className="flex flex-row justify-between border border-b-slate-700 w-[80%]">
            <h3 className="text-2xl font-semibold border border-b-black">
              Novel
            </h3>
            <div className="border border-b-black">
              <button
                id="dropdownNavbarLink"
                data-dropdown-toggle="chapterDropdownMenu"
                className="flex items-center justify-between gap-20 w-auto py-1 px-2 mr-3  bg-white  text-gray-700  hover:bg-white hover:text-gray-700 md:border-0 md:hover:text-white-700 dark:text-white dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
              >
                {current}
                <svg
                  className="w-2.5 h-2.5 ml-2.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>

              <div
                id="chapterDropdownMenu"
                className="z-10 hidden font-normal bg-gray-700 divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
              >
                <ul
                  className="py-2 text-sm text-gray-700 dark:text-gray-400"
                  aria-labelledby="dropdownLargeButton"
                >
                  {genreList.map((genre, i) => (
                    <li
                      key={i}
                      onClick={() => {
                        setCurrent(genre);
                      }}
                      className="block px-4 py-2 text-center text-white cursor-pointer hover:bg-gray-500 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      {genre}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <NovelList />
          {/* Chapter List */}
          <div className="flex flex-row justify-between border border-b-slate-700 w-[80%]">
            <h3 className="text-2xl font-semibold border border-b-black">
              Chapter
            </h3>
          </div>
          <ChapterList />
        </>
      ) : (
        <div className="flex flex-col gap-1 justify-center xl:flex-row lg:flex-row md:flex-row">
          <span
            className="bg-yellow-900 text-white py-2 px-3 cursor-pointer"
            onClick={handleLogout}
          >
            Logout
          </span>
        </div>
      )}
    </>
  );
};

export default Dashboard;
