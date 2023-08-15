const Novel = require('../model/novelModel');
const Chapter = require('../model/chapterModel');

// @desc    create a new novel
// @route   POST /api/novel
// @access  Private
const createNovel = async (req, res) => {
  const { name, category, description, coverUrl, ...rest } = req.body;

  if (!name) {
    return res.status(400).json({
      success: false,
      message: 'Please provide name!',
    });
  }

  if (!category) {
    return res.status(400).json({
      success: false,
      message: 'Please provide category!',
    });
  }

  try {
    const novel = await Novel.create({
      name,
      category,
      description: description ? description : undefined,
      coverUrl: coverUrl ? coverUrl : undefined,
      ...rest,
    });

    if (novel) {
      return res.status(201).json({
        success: true,
        message: 'Novel created successfully',
        novel,
      });
    } else {
      return res.status(500).json({
        success: false,
        message: 'Internal server error!',
      });
    }
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Novel already exists!',
      });
    }

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get all novels
// @route   GET /api/novel
// @access  Public
const getAllNovels = async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = 10;
  const novels = await Novel.find({})
    .sort({ updatedAt: -1 })
    .limit(10)
    .skip(limit * (page - 1));

  const chapterCount = await Chapter.countDocuments();

  const count = await Novel.countDocuments();
  const pages = Math.ceil(count / limit);

  let startPage = null;
  let endPage = null;

  // if pages greater 10 then show only 10 pages in pagination
  if (pages < 10) {
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

  if (novels) {
    return res.status(200).json({
      success: true,
      message: 'Get all novels successfully',
      totalNovel: count,
      pagination,
      totalChapter: chapterCount,
      novels,
    });
  } else {
    return res.status(500).json({
      success: false,
      message: 'Internal server error!',
    });
  }
};
const getSearchNovels = async (req, res) => {
  const page = Number(req.query.page) || 1;
  const q = req.query.q;
  const limit = 10;
  const novels = await Novel.find({ name: { $regex: q, $options: 'i' } })
    .sort({ updatedAt: -1 })
    .limit(10)
    .skip(limit * (page - 1));

  const count = await Novel.countDocuments({
    name: { $regex: q, $options: 'i' },
  });
  const pages = Math.ceil(count / limit);

  let startPage = null;
  let endPage = null;

  // if pages greater 10 then show only 10 pages in pagination
  if (pages < 10) {
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

  if (novels) {
    return res.status(200).json({
      success: true,
      message: 'Get all novels successfully',
      novels,
      total: count,
      pagination,
    });
  } else {
    return res.status(500).json({
      success: false,
      message: 'Internal server error!',
    });
  }
};
const getNovelsByCategory = async (req, res) => {
  const page = Number(req.query.page) || 1;
  const q = req.query.category;
  const limit = 10;

  const novels = await Novel.find({ category: { $elemMatch: { $eq: q } } })
    .sort({ updatedAt: -1 })
    .limit(10)
    .skip(limit * (page - 1));

  const count = await Novel.countDocuments({
    category: { $elemMatch: { $eq: q } },
  });
  const pages = Math.ceil(count / limit);

  let startPage = null;
  let endPage = null;

  // if pages greater 10 then show only 10 pages in pagination
  if (pages < 10) {
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

  if (novels) {
    return res.status(200).json({
      success: true,
      message: 'Get all novels successfully',
      novels,
      total: count,
      pagination,
    });
  } else {
    return res.status(500).json({
      success: false,
      message: 'Internal server error!',
    });
  }
};
// @desc    Get all latest novels
// @route   GET /api/novel
// @access  Public
const getLatestNovels = async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = 10;
  const novels = await Novel.find({})
    .sort({ updatedAt: -1 })
    .limit(10)
    .skip(limit * (page - 1));

  const count = await Novel.countDocuments();

  const pages = Math.ceil(count / limit);

  let startPage = null;
  let endPage = null;

  // if pages greater 10 then show only 10 pages in pagination
  if (pages < 10) {
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

  if (novels) {
    return res.status(200).json({
      success: true,
      message: 'Get all novels successfully',
      novels,
      total: count,
      pagination,
    });
  } else {
    return res.status(500).json({
      success: false,
      message: 'Internal server error!',
    });
  }
};

// @desc    Get a novel by id
// @route   GET /api/novel/:id
// @access  Public
const getNovelById = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = 10;

    const novel = await Novel.findById(req.params.id);

    const chapters = await Chapter.find({ novelId: req.params.id })
      .select('-content')
      .sort({ createdAt: 1 })
      .limit(10)
      .skip(limit * (page - 1));

    const count = await Chapter.countDocuments({ novelId: req.params.id });

    const pages = Math.ceil(count / limit);

    let startPage = null;
    let endPage = null;

    // if pages greater 10 then show only 10 pages in pagination
    if (pages < 10) {
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

    const latestChapters = await Chapter.find({ novelId: req.params.id })
      .sort({ createdAt: -1 })
      .select('-content')
      .limit(5);

    if (novel) {
      return res.status(200).json({
        success: true,
        message: 'Get novel successfully',
        novel,
        chapters,
        total: count,
        pagination,
        latestChapters,
      });
    } else {
      return res.status(500).json({
        success: false,
        message: 'Internal server error!',
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Update a novel by id
// @route   PUT /api/novel/:id
// @access  Private
const updateNovelById = async (req, res) => {
  try {
    const novel = await Novel.findById(req.params.id);

    if (!novel) {
      return res.status(404).json({
        success: false,
        message: 'Novel not found!',
      });
    }

    const updatedNovel = await Novel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    return res.status(200).json({
      success: true,
      message: 'Novel updated successfully',
      novel: updatedNovel,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Delete a novel by id
// @route   DELETE /api/novel/:id
// @access  Private
const deleteNovelById = async (req, res) => {
  try {
    const novel = await Novel.findById(req.params.id);

    if (!novel) {
      return res.status(404).json({
        success: false,
        message: 'Novel not found!',
      });
    }

    await Novel.findByIdAndDelete(req.params.id);
    // also delete all chapters of this novel
    await Chapter.deleteMany({ novelId: req.params.id });

    return res.status(200).json({
      success: true,
      message: 'Novel and its chapter are deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getNovelsCompleted = async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = 10;

  const novels = await Novel.find({ status: 'Completed' })
    .sort({ updatedAt: -1 })
    .limit(10)
    .skip(limit * (page - 1));

  const count = await Novel.countDocuments({ status: 'Completed' });

  const pages = Math.ceil(count / limit);

  let startPage = null;
  let endPage = null;

  // if pages greater 10 then show only 10 pages in pagination
  if (pages < 10) {
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

  if (novels) {
    return res.status(200).json({
      success: true,
      message: 'Get all novels successfully',
      novels,
      total: count,
      pagination,
    });
  } else {
    return res.status(500).json({
      success: false,
      message: 'No completed novel!',
    });
  }
};

const getHotNovels = async (req, res) => {
  const novels = await Novel.find({ hotNovel: true })
    .sort({ updatedAt: -1 })
    .limit(11);

  const count = await Novel.countDocuments();

  if (novels) {
    return res.status(200).json({
      success: true,
      message: 'Get all novels successfully',
      total: count,
      novels,
    });
  } else {
    return res.status(500).json({
      success: false,
      message: 'No hot novel found!',
    });
  }
};

module.exports = {
  createNovel,
  getAllNovels,
  getSearchNovels,
  getNovelsByCategory,
  getLatestNovels,
  getNovelById,
  updateNovelById,
  deleteNovelById,
  getNovelsCompleted,
  getHotNovels,
};
