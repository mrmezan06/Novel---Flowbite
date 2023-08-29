import {
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
} from '../constant/userConstant';

import axios from 'axios';
import { BASE_URL } from '../constant/baseUrl';

export const login = (userdata) => async (dispatch) => {
  try {
    dispatch({
      type: LOGIN_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axios.post(
      `${BASE_URL}/api/user/login`,
      userdata,
      config
    );

    const user = data?.user;

    // console.log(user);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: user,
    });

    localStorage.setItem('user', JSON.stringify(user));
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload: error,
    });
  }
};

export const logout = () => async (dispatch) => {
  const user = JSON.parse(localStorage.getItem('user'));

  if (!user) {
    dispatch({
      type: LOGOUT_SUCCESS,
    });
  }



  await axios.get(`${BASE_URL}/api/user/logout`);
  dispatch({
    type: LOGOUT_SUCCESS,
  });
  localStorage.removeItem('user');
};
