const express = require('express');
const {
  createNovel,
  getAllNovels,
  getNovelById,
  updateNovelById,
  deleteNovelById,
  getLatestNovels,
  getNovelsCompleted,
  getHotNovels,
  getSearchNovels,
  getNovelsByCategory,
} = require('../controller/novelController');
const { checkAuth, checkRole } = require('../utils/checkAuth');

const router = express.Router();

router.post('/', checkAuth, checkRole('ADMIN'), createNovel);
router.get('/', getAllNovels);
router.get('/search', getSearchNovels);
router.get('/category', getNovelsByCategory);
router.get('/completed', getNovelsCompleted);
router.get('/hot', getHotNovels);
router.get('/latest', getLatestNovels);
router.get('/get/:id', getNovelById);
router.put('/:id', checkAuth, checkRole('ADMIN'), updateNovelById);
router.delete('/:id', checkAuth, checkRole('ADMIN'), deleteNovelById);

module.exports = router;
