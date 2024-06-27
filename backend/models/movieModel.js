// models/movieModel.js

const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  releaseYear: {
    type: Number,
  },
  genre: {
    type: String,
  },
  watched: {
    type: Boolean,
    default: false,
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
  },
  review: {
    type: String,
  },
});

module.exports = mongoose.model('Movie', MovieSchema);

