import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../action/userAction';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const { loading, error, user } = useSelector((state) => state.login);

  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(login({ username, password }));
  };

  // console.log(data);

  useEffect(() => {
    if (loading) {
      toast.info('Loading...');
    }
    if (error) {
      toast.error(error);
    }

    if (user) {
      toast.dismiss();
      toast.success(`Welcome ${user?.name}`);
      navigate('/dashboard');
    }
  }, [loading, error, user, navigate]);

  return (
    <>
      <section className="bg-white border border-slate-900 mt-5 mb-5 rounded-md p-10 shadow-lg shadow-slate-600 w-[90%] lg:w-[30%]  dark:bg-gray-900 ">
        <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
          <h2 className="mb-4 text-xl font-bold text-gray-900 text-center dark:text-white">
            Login
          </h2>
          <form onSubmit={handleLogin}>
            <div className="grid gap-4 sm:grid-cols-4 sm:gap-6">
              <div className="sm:col-span-4">
                <label
                  htmlFor="username"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  value={username}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Type your username"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="sm:col-span-4">
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Type your password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <div className="flex justify-center mt-10">
              <button
                type="submit"
                className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-gray-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
              >
                Login
              </button>
            </div>
          </form>
          {/* Don't have account? Registe */}
          <div className="flex flex-row items-center justify-center mt-10">
            <p className="px-5 py-2.5 text-sm text-gray-900 dark:text-white">
              Don't have account?{' '}
            </p>
            <a
              href="/admin/register"
              className=" px-5 py-2.5 text-sm font-medium text-center text-black "
            >
              Register
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
