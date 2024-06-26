// controllers/movieController.js

const Movie = require('../models/movieModel');

// Get all movies
exports.getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add a new movie
exports.addMovie = async (req, res) => {
  const movie = new Movie({
    title: req.body.title,
    description: req.body.description,
    releaseYear: req.body.releaseYear,
    genre: req.body.genre,
    rating: req.body.rating,
    review: req.body.review,
  });

  try {
    const newMovie = await movie.save();
    res.status(201).json(newMovie);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get a single movie
exports.getMovie = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ message: 'Movie not found' });
    res.json(movie);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a movie
exports.updateMovie = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ message: 'Movie not found' });

    movie.title = req.body.title || movie.title;
    movie.description = req.body.description || movie.description;
    movie.releaseYear = req.body.releaseYear || movie.releaseYear;
    movie.genre = req.body.genre || movie.genre;
    movie.watched = req.body.watched !== undefined ? req.body.watched : movie.watched;
    movie.rating = req.body.rating || movie.rating;
    movie.review = req.body.review || movie.review;

    const updatedMovie = await movie.save();
    res.json(updatedMovie);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a movie
// controllers/movieController.js

exports.deleteMovie = async (req, res) => {
    try {
      const movie = await Movie.findById(req.params.id);
      if (!movie) return res.status(404).json({ message: 'Movie not found' });
  
      await Movie.deleteOne({ _id: req.params.id }); // Change here
      res.json({ message: 'Movie removed' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  

// Toggle watched status
exports.toggleWatched = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ message: 'Movie not found' });

    movie.watched = !movie.watched;
    const updatedMovie = await movie.save();
    res.json(updatedMovie);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Rate and review a movie
exports.rateAndReview = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ message: 'Movie not found' });

    movie.rating = req.body.rating;
    movie.review = req.body.review;
    const updatedMovie = await movie.save();
    res.json(updatedMovie);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
