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
  CLEAR_ERRORS,
} from '../constants/movieConstants';

const initialState = {
  movies: [],
  movie: {},
  loading: false,
  error: null,
};

export const moviesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ALL_MOVIES_REQUEST:
    case MOVIE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ALL_MOVIES_SUCCESS:
      return {
        ...state,
        loading: false,
        movies: action.payload,
      };
    case MOVIE_SUCCESS:
      return {
        ...state,
        loading: false,
        movie: action.payload,
      };
    case ALL_MOVIES_FAIL:
    case MOVIE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case ADD_MOVIE:
      return {
        ...state,
        movies: [...state.movies, action.payload],
      };
    case UPDATE_MOVIE:
      return {
        ...state,
        movies: state.movies.map((movie) => movie._id === action.payload._id ? action.payload : movie),
      };
    case DELETE_MOVIE:
      return {
        ...state,
        movies: state.movies.filter((movie) => movie._id !== action.payload),
      };
    case TOGGLE_WATCHED:
      return {
        ...state,
        movies: state.movies.map((movie) => movie._id === action.payload._id ? action.payload : movie),
      };
    case RATE_MOVIE:
      return {
        ...state,
        movies: state.movies.map((movie) => movie._id === action.payload._id ? action.payload : movie),
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
