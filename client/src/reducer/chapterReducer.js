export const getChaptersReducer = (state = {}, action) => {
  switch (action.type) {
    case 'GET_CHAPTERS_REQUEST':
      return {
        loading: true,
      };
    case 'GET_CHAPTERS_SUCCESS':
      return {
        loading: false,
        chapters: action.payload.chapters,
        total: action.payload.total,
      };
    case 'GET_CHAPTERS_FAIL':
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getChapterReducer = (state = {}, action) => {
  switch (action.type) {
    case 'GET_CHAPTER_REQUEST':
      return {
        loading: true,
      };
    case 'GET_CHAPTER_SUCCESS':
      return {
        loading: false,
        chapter: action.payload,
      };
    case 'GET_CHAPTER_FAIL':
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getAllChapterReducer = (state = {}, action) => {
  switch (action.type) {
    case 'GET_ALL_CHAPTER_REQUEST':
      return {
        loading: true,
      };
    case 'GET_ALL_CHAPTER_SUCCESS':
      return {
        loading: false,
        chapters: action.payload.chapters,
        total: action.payload.total,
      };
    case 'GET_ALL_CHAPTER_FAIL':
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
