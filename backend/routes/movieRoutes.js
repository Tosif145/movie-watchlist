// routes/movieRoutes.js

const express = require('express');
const router = express.Router();
const movieController = require('../Controllers/movieController');

router.get('/', movieController.getAllMovies);
router.post('/addMovie', movieController.addMovie);
router.get('/details/:id', movieController.getMovie);
router.put('/:id', movieController.updateMovie);
router.delete('/:id', movieController.deleteMovie);
router.patch('/details/:id', movieController.toggleWatched);
router.patch('/:id/rate', movieController.rateAndReview);

module.exports = router;
