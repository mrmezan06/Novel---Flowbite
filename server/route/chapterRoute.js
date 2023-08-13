const express = require('express');
const { checkAuth, checkRole } = require('../utils/checkAuth');
const {
  createChapter,
  getAllChaptersByNovelId,
  getChapterById,
} = require('../controller/chapterController');
const {
  updateNovelById,
  deleteNovelById,
} = require('../controller/novelController');

const router = express.Router();

router.post('/', checkAuth, checkRole('ADMIN'), createChapter);
router.get('/:novelId', getAllChaptersByNovelId);
router.get('/single/:chapterId', getChapterById);
router.put('/:id', checkAuth, checkRole('ADMIN'), updateNovelById);
router.delete('/:id', checkAuth, checkRole('ADMIN'), deleteNovelById);

module.exports = router;
