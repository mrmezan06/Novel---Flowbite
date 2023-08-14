import {
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
} from '../constant/userConstant';

export const loginReducer = (state = {}, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        loading: true,
      };
    case LOGIN_SUCCESS:
      return {
        loading: false,
        user: action.payload,
      };
    case LOGIN_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case LOGOUT_SUCCESS:
      return {
        user: null,
      };
    default:
      return state;
  }
};
