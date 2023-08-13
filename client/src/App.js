import Layout from './Layout/Layout';
import Chapter from './page/Chapter';
import { Route, Routes } from 'react-router-dom';
import Home from './page/Home';
import CreateNovel from './page/CreateNovel';
import AddChapter from './page/AddChapter';
import Login from './page/Login';
import Register from './page/Register';
import Novel from './page/Novel';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/novel" element={<Novel />} />
          <Route path="/chapter" element={<Chapter />} />
          <Route path="/create/novel" element={<CreateNovel />} />
          <Route path="/add/chapter" element={<AddChapter />} />
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin/register" element={<Register />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
