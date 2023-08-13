const mongoose = require('mongoose');

const novelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    category: {
      type: [String],
      required: true,
    },
    description: {
      type: String,
      default: 'No description',
    },
    lastReleased: {
      type: String,
      default: 'No chapter released',
    },
    coverUrl: {
      type: String,
      default:
        'https://png.pngtree.com/png-vector/20191027/ourmid/pngtree-book-cover-template-vector-realistic-illustration-isolated-on-gray-background-empty-png-image_1893997.jpg',
    },
    author: {
      type: String,
      default: 'Anonymous',
    },
    alternativeName: {
      type: String,
      default: 'No alternative name',
    },
    rating: {
      type: [Number],
    },
    totalChapter: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ['Ongoing', 'Completed'],
      default: 'Ongoing',
    },
    hotNovel: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Novel = mongoose.model('Novel', novelSchema);

module.exports = Novel;
