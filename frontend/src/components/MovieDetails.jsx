import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteMovie,
  toggleWatched,
  fetchMovieDetails,
} from "../redux/actions/movieActions";
import { useParams, useNavigate } from "react-router-dom";
import "./css/MovieDetails.css";

const MovieDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, movie, error } = useSelector((state) => state.movies);

  useEffect(() => {
    dispatch(fetchMovieDetails(id));
  }, [dispatch, id]);

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this movie?")) {
      dispatch(deleteMovie(movie._id));
      navigate("/");
    }
  };

  const handleEditMovie = () => {
    navigate(`/movies/${movie._id}/rate`);
  };

  const handleBack = () => {
    navigate("/");
  }
  

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!movie) return <p>Movie not found</p>;

  return (
    <div className="movie-details">
      <div className="movie-card">
        <div className="container">
          <a href="#">
            <img
              src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/hobbit_cover.jpg"
              alt="cover"
              className="cover"
            />
          </a>
          <div className="hero">
            <div className="buttons-detail">
              <div className="inner-btn">
                <button
                  className="back"
                  onClick={() => handleEditMovie(movie._id)}
                >
                  Edit
                </button>
                <button className="back" onClick={() => handleDelete(movie._id)}>
                  Delete
                </button>
              </div>

              <button onClick={handleBack} className="back">Back</button>
            </div>
            <div className="details">
              <div className="title1">
                {movie.title} <span>{movie.releaseYear}</span>
              </div>
              <div className="title2"></div>
              <div className="rating-like">
                <fieldset className="rating">
                  <p>Rating: {movie.rating ? movie.rating : 0} ⭐ </p>
                </fieldset>
                <span className="likes">
                  {" "}
                  watched : {movie.watched ? "Watched ▶" : "Not watched  ⏯"}
                </span>
              </div>
            </div>
          </div>
          <div className="description">
            <div className="column1">
              <span className="tag">Genre : {movie.genre}</span>
            </div>
            <div className="column2">
              <h2>Description : </h2>
              <p>
                {movie.description}, Thorin Oakenshield. Their journey will take
                them into the Wild; through... <a href="#">read more</a>
              </p>
            </div>
          </div>
          <div className="description">

            <div className="column2">
              <h2>Review : </h2>
              <p>
                {movie.review}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
