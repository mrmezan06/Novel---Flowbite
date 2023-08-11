import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Layout = () => {
  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center max-w-[100vw]">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default Layout;
