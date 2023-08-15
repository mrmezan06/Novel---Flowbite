import React from 'react';
import { useLocation } from 'react-router-dom';
import Category from '../components/Category';

const CategoryPage = () => {
  const location = useLocation();

  const query = location.search.split('=')[1];

  return (
    <>
      <div className="container mt-10 mb-10">
        <div className="flex flex-row justify-between border border-b-slate-700">
          <h3 className="text-2xl font-semibold border border-b-black">
            Category : {query}
          </h3>
        </div>

        {/* Category Component */}
        <Category category={query} />
      </div>
    </>
  );
};

export default CategoryPage;
