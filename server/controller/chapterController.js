const Novel = require('../model/novelModel');
const Chapter = require('../model/chapterModel');

// @desc    create a new chapter
// @route   POST /api/chapter
// @access  Private
const createChapter = async (req, res) => {
  try {
    const { novelId, chapter, title, content } = req.body;

    const novel = await Novel.findById(novelId);
    if (!novel) {
      return res
        .status(404)
        .json({ success: false, message: 'Novel not found!' });
    }

    if (!chapter || !title || !content) {
      return res
        .status(400)
        .json({ success: false, message: 'Please fill all required fields!' });
    }

    const contentArray = content.split('\n');

    const newChapter = new Chapter({
      novelId,
      chapter,
      title,
      content: contentArray,
    });

    await newChapter.save();

    return res.status(201).json({
      success: true,
      message: 'New chapter created!',
      newChapter,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// @desc    get all chapters by novelId
// @route   GET /api/chapter/:novelId
// @access  Public
const getAllChaptersByNovelId = async (req, res) => {
  try {
    const { novelId } = req.params;

    const novel = await Novel.findById(novelId);
    if (!novel) {
      return res
        .status(404)
        .json({ success: false, message: 'Novel not found!' });
    }

    const chapters = await Chapter.find({ novelId }).sort({ chapter: 1 });
    const totalChapter = chapters.length;

    if (chapters.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: 'No chapter found!', novel });
    }

    return res
      .status(200)
      .json({ success: true, totalChapter, novel, chapters });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// @desc    get a chapter by chapterId
// @route   GET /api/chapter/single/:chapterId
// @access  Public
const getChapterById = async (req, res) => {
  try {
    const { chapterId } = req.params;

    const chapter = await Chapter.findById(chapterId);
    if (!chapter) {
      return res
        .status(404)
        .json({ success: false, message: 'Chapter not found!' });
    }

    const novel = await Novel.findById(chapter.novelId);

    return res.status(200).json({ success: true, chapter, novel });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// @desc    delete a chapter by chapterId
// @route   DELETE /api/chapter/:chapterId
// @access  Private
const deleteChapterById = async (req, res) => {
  try {
    const { chapterId } = req.params;

    const chapter = await Chapter.findById(chapterId);
    if (!chapter) {
      return res
        .status(404)
        .json({ success: false, message: 'Chapter not found!' });
    }

    await Chapter.findByIdAndDelete(chapterId);

    return res
      .status(200)
      .json({ success: true, message: 'Chapter is deleted!' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// @desc    update a chapter by chapterId
// @route   PUT /api/chapter/:chapterId
// @access  Private
const updateChapterById = async (req, res) => {
  try {
    const { chapterId } = req.params;
    const { chapter, title, content } = req.body;

    const chapterToUpdate = await Chapter.findById(chapterId);
    if (!chapterToUpdate) {
      return res
        .status(404)
        .json({ success: false, message: 'Chapter not found!' });
    }

    if (!chapter || !title || !content) {
      return res
        .status(400)
        .json({ success: false, message: 'Please fill all required fields!' });
    }

    const updatedChapter = await Chapter.findByIdAndUpdate(
      chapterId,
      req.body,
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: 'Chapter is updated!',
      chapter: updatedChapter,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createChapter,
  getAllChaptersByNovelId,
  getChapterById,
  deleteChapterById,
  updateChapterById,
};
