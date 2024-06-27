import axios from 'axios';
import {
  ALL_MOVIES_REQUEST,
  MOVIE_REQUEST,
  ALL_MOVIES_SUCCESS,
  ALL_MOVIES_FAIL,
  MOVIE_SUCCESS,
  MOVIE_FAIL,
  ADD_MOVIE,
  UPDATE_MOVIE,
  DELETE_MOVIE,
  TOGGLE_WATCHED,
  RATE_MOVIE,
  REVIEW_MOVIE,
  CLEAR_ERRORS,
} from '../constants/movieConstants';

const BASE_URL = 'http://localhost:5000/api/movies';
// const BASE_URL = 'https://movie-watchlist-backend.vercel.app/api/movies';  // Hosted backend url



// Fetch all movies
export const fetchMovies = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_MOVIES_REQUEST });

    const { data } = await axios.get(BASE_URL);

    dispatch({
      type: ALL_MOVIES_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_MOVIES_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Fetch movie details
export const fetchMovieDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: MOVIE_REQUEST });

    const { data } = await axios.get(`${BASE_URL}/details/${id}`);

    dispatch({
      type: MOVIE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: MOVIE_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Add a new movie
export const addMovie = (movieData) => async (dispatch) => {
  try {
    const { data } = await axios.post(`${BASE_URL}/addMovie`, movieData);

    dispatch({
      type: ADD_MOVIE,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_MOVIES_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Update a movie
export const updateMovie = (id, movieData) => async (dispatch) => {
  try {
    const { data } = await axios.put(`${BASE_URL}/${id}`, movieData);

    dispatch({
      type: UPDATE_MOVIE,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_MOVIES_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete a movie
export const deleteMovie = (id) => async (dispatch) => {
  try {
    await axios.delete(`${BASE_URL}/${id}`);

    dispatch({
      type: DELETE_MOVIE,
      payload: id,
    });
  } catch (error) {
    dispatch({
      type: ALL_MOVIES_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Toggle watched status of a movie
export const toggleWatched = (id, watched) => async (dispatch) => {
  try {
    const { data } = await axios.patch(`${BASE_URL}/details/${id}`, { watched });

    dispatch({
      type: TOGGLE_WATCHED,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_MOVIES_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Rate and review a movie
export const rateAndReview = (id, rating, review) => async (dispatch) => {
  try {
    const { data } = await axios.patch(`${BASE_URL}/${id}/rate`, { rating, review });

    dispatch({
      type: RATE_MOVIE,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_MOVIES_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Clear errors
export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
