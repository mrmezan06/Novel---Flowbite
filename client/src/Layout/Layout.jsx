import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Layout = () => {
  const location = useLocation();
  const path = location.pathname.split('/')[1];
  const createPath = location.pathname.split('/')[2];

  return (
    <div
      className={`${
        path === 'chapter' || createPath === 'create'
          ? 'bg-gray-900'
          : 'bg-white'
      }`}
    >
      <Navbar />
      <div className="flex flex-col items-center   min-h-[83vh] max-w-[100vw] mb-10">
        <Outlet />
      </div>
      <Footer path={path} createPath={createPath} />
    </div>
  );
};

export default Layout;
