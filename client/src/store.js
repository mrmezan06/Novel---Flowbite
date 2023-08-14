const { createStore, combineReducers, applyMiddleware } = require('redux');

const thunk = require('redux-thunk').default;
const { composeWithDevTools } = require('redux-devtools-extension');
const { loginReducer } = require('./reducer/authReducer');
const {
  getNovelReducer,
  getNovelsReducer,
  createNovelReducer,
  getLatestNovelsReducer,
  getNovelsCompletedReducer,
  getHotNovelsReducer,
} = require('./reducer/novelReducer');
const {
  getChapterReducer,
  getChaptersReducer,
  getAllChapterReducer,
} = require('./reducer/chapterReducer');

const reducer = combineReducers({
  login: loginReducer,
  novel: getNovelReducer,
  novels: getNovelsReducer,
  novelCreate: createNovelReducer,
  latest: getLatestNovelsReducer,
  completed: getNovelsCompletedReducer,
  hot: getHotNovelsReducer,
  chapter: getChapterReducer,
  chapters: getChaptersReducer,
  allChapters: getAllChapterReducer,
});

const user = localStorage.getItem('user')
  ? JSON.parse(localStorage.getItem('user'))
  : null;

const initialState = {
  login: { user },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

module.exports = store;
