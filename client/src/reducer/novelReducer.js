export const createNovelReducer = (state = {}, action) => {
  switch (action.type) {
    case 'CREATE_NOVEL_REQUEST':
      return {
        loading: true,
      };
    case 'CREATE_NOVEL_SUCCESS':
      return {
        loading: false,
        novel: action.payload,
      };
    case 'CREATE_NOVEL_FAIL':
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getNovelReducer = (state = {}, action) => {
  switch (action.type) {
    case 'GET_NOVEL_REQUEST':
      return {
        loading: true,
      };
    case 'GET_NOVEL_SUCCESS':
      return {
        loading: false,
        novel: action.payload,
      };
    case 'GET_NOVEL_FAIL':
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getNovelsReducer = (state = {}, action) => {
  switch (action.type) {
    case 'GET_NOVELS_REQUEST':
      return {
        loading: true,
      };
    case 'GET_NOVELS_SUCCESS':
      return {
        loading: false,
        novels: action.payload.novels,
        total: action.payload.total,
      };
    case 'GET_NOVELS_FAIL':
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
