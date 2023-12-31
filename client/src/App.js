import Layout from './Layout/Layout';
import Chapter from './page/Chapter';
import { Route, Routes } from 'react-router-dom';
import Home from './page/Home';
import CreateNovel from './page/CreateNovel';
import AddChapter from './page/AddChapter';
import Login from './page/Login';
import Register from './page/Register';
import Novel from './page/Novel';
import NotFound from './page/NotFound';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './page/Dashboard';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import {
  getHotNovels,
  getLatestNovels,
  getNovels,
  getNovelsCompleted,
} from './action/novelAction';

import { getAllChapters } from './action/chapterAction';
import UpdateNovel from './page/UpdateNovel';
import UpdateChapter from './page/UpdateChapter';
import Search from './page/Search';
import CategoryPage from './page/CategoryPage';

function App() {
  const { user } = useSelector((state) => state.login);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getNovels());
    dispatch(getLatestNovels());
    dispatch(getNovelsCompleted());
    dispatch(getHotNovels());
    dispatch(getAllChapters());
  }, [dispatch]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          {/* if no user forward to login page else dashboard or other page */}
          <Route path="/dashboard" element={user ? <Dashboard /> : <Login />} />

          {/* <Route path="/dashboard" element={<Dashboard />} /> */}
          <Route
            path="/novel/create"
            element={user ? <CreateNovel /> : <Login />}
          />
          <Route
            path="/novel/update/:id"
            element={user ? <UpdateNovel /> : <Login />}
          />
          <Route
            path="/chapter/add"
            element={user ? <AddChapter /> : <Login />}
          />
          <Route
            path="/chapter/update/:id"
            element={user ? <UpdateChapter /> : <Login />}
          />
          <Route path="/novel/:id" element={<Novel />} />
          <Route path="/search" element={<Search />} />
          <Route path="/genre" element={<CategoryPage />} />
          <Route path="/chapter" element={<Chapter />} />
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin/register" element={<Register />} />
          {/* Not Found Page */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
