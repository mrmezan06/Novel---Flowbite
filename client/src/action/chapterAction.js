import axios from 'axios';
import { BASE_URL } from '../constant/baseUrl';

export const getChapters = (novelId) => async (dispatch) => {
  try {
    dispatch({
      type: 'GET_CHAPTERS_REQUEST',
    });

    const { data } = await axios.get(`${BASE_URL}/api/chapter/get/${novelId}`);

    dispatch({
      type: 'GET_CHAPTERS_SUCCESS',
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: 'GET_CHAPTERS_FAIL',
      payload: error,
    });
  }
};

export const getChapter = (chapterId) => async (dispatch) => {
  try {
    dispatch({
      type: 'GET_CHAPTER_REQUEST',
    });

    const { data } = await axios.get(
      `${BASE_URL}/api/chapter/single/${chapterId}`
    );

    dispatch({
      type: 'GET_CHAPTER_SUCCESS',
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: 'GET_CHAPTER_FAIL',
      payload: error,
    });
  }
};

export const getAllChapters = (page) => async (dispatch) => {
  try {
    dispatch({
      type: 'GET_ALL_CHAPTER_REQUEST',
    });

    const { data } = await axios.get(
      `${BASE_URL}/api/chapter/all?page=${page ? page : 1}`
    );

    dispatch({
      type: 'GET_ALL_CHAPTER_SUCCESS',
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: 'GET_ALL_CHAPTER_FAIL',
      payload: error,
    });
  }
};
