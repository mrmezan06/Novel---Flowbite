const express = require('express');
const {
  createNovel,
  getAllNovels,
  getNovelById,
  updateNovelById,
  deleteNovelById,
} = require('../controller/novelController');
const { checkAuth, checkRole } = require('../utils/checkAuth');

const router = express.Router();

router.post('/', checkAuth, checkRole('ADMIN'), createNovel);
router.get('/', getAllNovels);
router.get('/:id', getNovelById);
router.put('/:id', checkAuth, checkRole('ADMIN'), updateNovelById);
router.delete('/:id', checkAuth, checkRole('ADMIN'), deleteNovelById);

module.exports = router;
