import React, { useEffect } from 'react';
import AddChapterForm from '../components/AddChapterForm';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getNovels } from '../action/novelAction';

const AddChapter = () => {
  const { loading, error, novels } = useSelector((state) => state.novels);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getNovels());
  }, [dispatch]);

  useEffect(() => {
    if (loading) {
      toast.info('Loading...');
    }
    if (error) {
      toast.error(error);
    }
  }, [loading, error]);

  return (
    <>
      <AddChapterForm novels={novels} />
    </>
  );
};

export default AddChapter;
