import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchMovies,
  deleteMovie,
  toggleWatched,
} from "../redux/actions/movieActions";
import Card from "./Card";
import "./css/Card.css";
import "./css/HomePage.css";

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, movies, error } = useSelector((state) => state.movies);

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this movie?")) {
      dispatch(deleteMovie(id));
    }
  };

  const handleToggleWatched = (id, watched) => {
    dispatch(toggleWatched(id, !watched));
  };

  const handleAddMovie = () => {
    navigate("/addMovie");
  };

  const handleViewDetails = (id) => {
    navigate(`/movies/details/${id}`);
  };

  const handleEditMovie = (id) => {
    navigate(`/movies/${id}/rate`);
  };

  return (
    <div>
      <div className="navbar">
        <h2>Movie Watchlist</h2>
        <button className="nav-btn" onClick={handleAddMovie}>
          Add Movie
        </button>
      </div>

      {loading ? (
        <div className="loading">
          <div className="loader l1"></div>
          <div className="loader l2"></div>
          <div className="loader l3"></div>
          <div className="loader l4"></div>
          <div className="loader l5"></div>
          <div className="loader l6"></div>
          <div className="loader l7"></div>
        </div>
      ) : error ? (
        <div className="error">Something Went Wrong!!</div>
      ) : movies.length === 0 ? (
        <div className="error"><p>No movies in the list! Add movies to the watch list.</p></div>
        
      ) : (
        <div className="main-container">
          <ul>
            {movies.map((movie) => (
              <li key={movie._id} className="list-item">
                <div className="movie-card">
                  <Card movie={movie} />
                  <label className="item-label">
                    <span>Watched: </span>
                    <input
                      type="checkbox"
                      checked={movie.watched}
                      onChange={() =>
                        handleToggleWatched(movie._id, movie.watched)
                      }
                    />
                  </label>
                  <div className="buttons">
                    <button
                      className="btn"
                      onClick={() => handleEditMovie(movie._id)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn"
                      onClick={() => handleDelete(movie._id)}
                    >
                      Delete
                    </button>
                    <button
                      className="btn"
                      onClick={() => handleViewDetails(movie._id)}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default HomePage;


