import axios from 'axios';
import { BASE_URL } from '../constant/baseUrl';

export const createNovel = (novelData) => async (dispatch) => {
  try {
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user) {
      dispatch({
        type: 'CREATE_NOVEL_FAIL',
        payload: 'Login first to create novel',
      });
    }

    dispatch({
      type: 'CREATE_NOVEL_REQUEST',
    });

    const accessToken = user?.accessToken;
    const config = {
      headers: {
        authorization: accessToken,
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post(
      `${BASE_URL}/api/novel`,
      novelData,
      config
    );

    const novel = data?.novel;

    dispatch({
      type: 'CREATE_NOVEL_SUCCESS',
      payload: novel,
    });
  } catch (error) {
    dispatch({
      type: 'CREATE_NOVEL_FAIL',
      payload: error,
    });
  }
};

export const getNovel = (novelId, page) => async (dispatch) => {
  try {
    dispatch({
      type: 'GET_NOVEL_REQUEST',
    });

    const { data } = await axios.get(
      `${BASE_URL}/api/novel/get/${novelId}?page=${page ? page : 1}`
    );

    dispatch({
      type: 'GET_NOVEL_SUCCESS',
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: 'GET_NOVEL_FAIL',
      payload: error,
    });
  }
};

export const getNovels = (page) => async (dispatch) => {
  try {
    dispatch({
      type: 'GET_NOVELS_REQUEST',
    });

    const { data } = await axios.get(
      `${BASE_URL}/api/novel?page=${page ? page : 1}`
    );

    dispatch({
      type: 'GET_NOVELS_SUCCESS',
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: 'GET_NOVELS_FAIL',
      payload: error,
    });
  }
};

export const getSearchNovels = (search, page) => async (dispatch) => {
  try {
    dispatch({
      type: 'GET_SEARCH_NOVELS_REQUEST',
    });

    const { data } = await axios.get(
      `${BASE_URL}/api/novel/search?q=${search}&page=${page ? page : 1}`
    );

    dispatch({
      type: 'GET_SEARCH_NOVELS_SUCCESS',
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: 'GET_SEARCH_NOVELS_FAIL',
      payload: error,
    });
  }
};

export const getNovelsByCategory = (category, page) => async (dispatch) => {
  try {
    dispatch({
      type: 'GET_NOVELS_BY_CATEGORY_REQUEST',
    });

    const { data } = await axios.get(
      `${BASE_URL}/api/novel/category?category=${category}&page=${
        page ? page : 1
      }`
    );

    dispatch({
      type: 'GET_NOVELS_BY_CATEGORY_SUCCESS',
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: 'GET_NOVELS_BY_CATEGORY_FAIL',
      payload: error,
    });
  }
};

export const getLatestNovels = (page) => async (dispatch) => {
  try {
    dispatch({
      type: 'GET_LATEST_NOVELS_REQUEST',
    });

    const { data } = await axios.get(
      `${BASE_URL}/api/novel/latest?page=${page ? page : 1}`
    );

    dispatch({
      type: 'GET_LATEST_NOVELS_SUCCESS',
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: 'GET_LATEST_NOVELS_FAIL',
      payload: error,
    });
  }
};

export const getNovelsCompleted = (page) => async (dispatch) => {
  try {
    dispatch({
      type: 'GET_NOVELS_COMPLETED_REQUEST',
    });

    const { data } = await axios.get(
      `${BASE_URL}/api/novel/completed?page=${page ? page : 1}`
    );

    dispatch({
      type: 'GET_NOVELS_COMPLETED_SUCCESS',
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: 'GET_NOVELS_COMPLETED_FAIL',
      payload: error,
    });
  }
};

export const getHotNovels = () => async (dispatch) => {
  try {
    dispatch({
      type: 'GET_HOT_NOVELS_REQUEST',
    });

    const { data } = await axios.get(`${BASE_URL}/api/novel/hot`);

    dispatch({
      type: 'GET_HOT_NOVELS_SUCCESS',
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: 'GET_HOT_NOVELS_FAIL',
      payload: error,
    });
  }
};
