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
        chapter: action.payload.chapter,
        novel: action.payload.novel,
        prevChapter: action.payload.prevChapter,
        nextChapter: action.payload.nextChapter,
        chapterList: action.payload.chapterList,
      };
    case 'CHAPTER_RESET':
      return {};
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
        pagination: action.payload.pagination,
      };
    case 'CHAPTER_ALL_RESET':
      return {};
    case 'GET_ALL_CHAPTER_FAIL':
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
