const mongoose = require('mongoose');

const chapterSchema = new mongoose.Schema(
  {
    novelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Novel',
      required: true,
    },
    chapter: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: [String],
      required: true,
    },
    status: {
      type: String,
      enum: ['Draft', 'Published'],
      default: 'Draft',
    },
  },
  {
    timestamps: true,
  }
);

const Novel = require('./novelModel');

chapterSchema.pre('save', async function (next) {
  const novel = await Novel.findById(this.novelId);
  if (!novel) {
    return next(new Error('Novel not found!'));
  }

  if (this.chapter > novel.totalChapter + 1) {
    return next(new Error('Chapter number is invalid!'));
  }

  if (this.chapter === novel.totalChapter + 1) {
    novel.totalChapter = this.chapter;
    novel.lastReleased = `Chapter ${this.chapter}`;
    await novel.save();
  }

  next();
});

const Chapter = mongoose.model('Chapter', chapterSchema);

module.exports = Chapter;
