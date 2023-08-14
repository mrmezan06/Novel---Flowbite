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

export const getNovel = (novelId) => async (dispatch) => {
  try {
    dispatch({
      type: 'GET_NOVEL_REQUEST',
    });

    const { data } = await axios.get(`${BASE_URL}/api/novel/${novelId}`);

    const novel = data?.novel;

    dispatch({
      type: 'GET_NOVEL_SUCCESS',
      payload: novel,
    });
  } catch (error) {
    dispatch({
      type: 'GET_NOVEL_FAIL',
      payload: error,
    });
  }
};

export const getNovels = () => async (dispatch) => {
  try {
    dispatch({
      type: 'GET_NOVELS_REQUEST',
    });

    const { data } = await axios.get(`${BASE_URL}/api/novel`);

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
