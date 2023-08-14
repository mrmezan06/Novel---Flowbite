const express = require('express');
const { checkAuth, checkRole } = require('../utils/checkAuth');
const {
  createChapter,
  getAllChaptersByNovelId,
  getChapterById,
  getAllChapter,
  updateChapterById,
  deleteChapterById,
} = require('../controller/chapterController');

const router = express.Router();

router.post('/', checkAuth, checkRole('ADMIN'), createChapter);
router.get('/all', getAllChapter);
router.get('/single/:chapterId', getChapterById);
router.get('/get/:novelId', getAllChaptersByNovelId);
router.put('/:chapterId', checkAuth, checkRole('ADMIN'), updateChapterById);
router.delete('/:chapterId', checkAuth, checkRole('ADMIN'), deleteChapterById);

module.exports = router;
