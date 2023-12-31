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
        novel: action.payload.novel,
        chapters: action.payload.chapters,
        total: action.payload.total,
        pagination: action.payload.pagination,
        latestChapters: action.payload.latestChapters,
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
        totalNovel: action.payload.totalNovel,
        pagination: action.payload.pagination,
        totalChapter: action.payload.totalChapter,
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

export const getSearchNovelsReducer = (state = {}, action) => {
  switch (action.type) {
    case 'GET_SEARCH_NOVELS_REQUEST':
      return {
        loading: true,
      };
    case 'GET_SEARCH_NOVELS_SUCCESS':
      return {
        loading: false,
        novels: action.payload.novels,
        total: action.payload.total,
        pagination: action.payload.pagination,
      };
    case 'GET_SEARCH_NOVELS_FAIL':
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getNovelsByCategoryReducer = (state = {}, action) => {
  switch (action.type) {
    case 'GET_NOVELS_BY_CATEGORY_REQUEST':
      return {
        loading: true,
      };
    case 'GET_NOVELS_BY_CATEGORY_SUCCESS':
      return {
        loading: false,
        novels: action.payload.novels,
        total: action.payload.total,
        pagination: action.payload.pagination,
      };
    case 'GET_NOVELS_BY_CATEGORY_FAIL':
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};


export const getLatestNovelsReducer = (state = {}, action) => {
  switch (action.type) {
    case 'GET_LATEST_NOVELS_REQUEST':
      return {
        loading: true,
      };
    case 'GET_LATEST_NOVELS_SUCCESS':
      return {
        loading: false,
        novels: action.payload.novels,
        total: action.payload.total,
        pagination: action.payload.pagination,
      };
    case 'GET_LATEST_NOVELS_FAIL':
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getNovelsCompletedReducer = (state = {}, action) => {
  switch (action.type) {
    case 'GET_NOVELS_COMPLETED_REQUEST':
      return {
        loading: true,
      };
    case 'GET_NOVELS_COMPLETED_SUCCESS':
      return {
        loading: false,
        novels: action.payload.novels,
        total: action.payload.total,
        pagination: action.payload.pagination,
      };
    case 'GET_NOVELS_COMPLETED_FAIL':
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getHotNovelsReducer = (state = {}, action) => {
  switch (action.type) {
    case 'GET_HOT_NOVELS_REQUEST':
      return {
        loading: true,
      };
    case 'GET_HOT_NOVELS_SUCCESS':
      return {
        loading: false,
        novels: action.payload.novels,
        total: action.payload.total,
      };
    case 'GET_HOT_NOVELS_FAIL':
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
