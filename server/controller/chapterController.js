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

    // check if chapter already exist

    const chapterExist = await Chapter.findOne({ novelId, chapter });
    if (chapterExist) {
      return res.status(400).json({
        success: false,
        message: `Chapter ${chapter} already exist!`,
      });
    }

    const newChapter = new Chapter({
      novelId,
      chapter,
      title,
      content,
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

    if (!novel) {
      return res
        .status(404)
        .json({ success: false, message: 'Novel not found!' });
    }

    const currentChapter = chapter.chapter;

    const totalChapter = novel.totalChapter;

    let prevChapter = null;
    let chapterList = null;
    let nextChapter = null;

    if (currentChapter === totalChapter) {
      // if current chapter is the last chapter

      prevChapter = await Chapter.findOne({
        novelId: novel._id,
        chapter: currentChapter - 1,
      });
      // get the previous 10 chapter

      if (totalChapter < 10) {
        chapterList = await Chapter.find({
          novelId: novel._id,
          chapter: { $gte: 1, $lte: totalChapter },
        }).sort({ chapter: 1 });
      } else {
        chapterList = await Chapter.find({
          novelId: novel._id,
          chapter: { $gte: currentChapter - 10, $lte: currentChapter },
        }).sort({ chapter: 1 });
      }
    } else if (currentChapter === 1) {
      // if current chapter is the first chapter

      nextChapter = await Chapter.findOne({
        novelId: novel._id,
        chapter: currentChapter + 1,
      });
      // get the next 10 chapter

      if (totalChapter < 10) {
        chapterList = await Chapter.find({
          novelId: novel._id,
          chapter: { $gte: 1, $lte: totalChapter },
        }).sort({ chapter: 1 });
      } else {
        chapterList = await Chapter.find({
          novelId: novel._id,
          chapter: { $gte: currentChapter, $lte: currentChapter + 10 },
        }).sort({ chapter: 1 });
      }
    } else {
      // if current chapter is in the middle

      prevChapter = await Chapter.findOne({
        novelId: novel._id,
        chapter: currentChapter - 1,
      });
      nextChapter = await Chapter.findOne({
        novelId: novel._id,
        chapter: currentChapter + 1,
      });

      // get the previous 5 chapter and next 5 chapter
      if (totalChapter < 10) {
        chapterList = await Chapter.find({
          novelId: novel._id,
          chapter: { $gte: 1, $lte: totalChapter },
        }).sort({ chapter: 1 });
      } else {
        chapterList = await Chapter.find({
          novelId: novel._id,
          chapter: { $gte: currentChapter - 5, $lte: currentChapter + 5 },
        }).sort({ chapter: 1 });
      }
    }

    return res.status(200).json({
      success: true,
      chapter,
      novel,
      prevChapter,
      nextChapter,
      chapterList,
    });
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

    console.log(chapterId);

    const chapterToUpdate = await Chapter.findById(chapterId);
    if (!chapterToUpdate) {
      return res
        .status(404)
        .json({ success: false, message: 'Chapter not found!' });
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

const getAllChapter = async (req, res) => {
  try {

    const page = Number(req.query.page) || 1;
    const limit = 10;

    const chapters = await Chapter.find({})
      .sort({ createdAt: 1 })
      .select('-content')
      .populate('novelId', 'name')
      .limit(10)
      .skip(limit * (page - 1));
      

    const count = await Chapter.countDocuments({});

    const pages = Math.ceil(count / limit);

    let startPage = null;
    let endPage = null;

    // if pages greater 10 then show only 10 pages in pagination
    if (pages <= 10) {
      startPage = 1;
      endPage = pages;
    }

    if (pages > 10) {
      if (page <= 6) {
        startPage = 1;
        endPage = 10;
      } else if (page + 4 >= pages) {
        startPage = pages - 9;
        endPage = pages;
      } else {
        startPage = page - 5;
        endPage = page + 4;
      }
    }

    const pagination = {
      startPage,
      endPage,
      page,
      pages,
    };

    return res
      .status(200)
      .json({ success: true, chapters, total: count, pagination });
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
  getAllChapter,
};
