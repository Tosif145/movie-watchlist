import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMovie, updateMovie } from "../redux/actions/movieActions";
import { useNavigate, useParams } from "react-router-dom";
import "./css/MovieForm.css";

const MovieForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    releaseYear: "",
    genre: "",
    rating: 0, // Initialize rating field
    review: "", // Initialize review field
  });

  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { movies } = useSelector((state) => state.movies);

  useEffect(() => {
    if (id) {
      const movieToEdit = movies.find((movie) => movie._id === id);
      if (movieToEdit) {
        setFormData({
          title: movieToEdit.title,
          description: movieToEdit.description,
          releaseYear: movieToEdit.releaseYear,
          genre: movieToEdit.genre,
          rating: movieToEdit.rating || 0, // Set rating from movie if available
          review: movieToEdit.review || "", // Set review from movie if available
        });
      }
    }
  }, [id, movies]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      dispatch(updateMovie(id, formData));
    } else {
      dispatch(addMovie(formData));
    }
    navigate("/");
  };

  return (
    <form class="form" onSubmit={handleSubmit}>
      <input
        placeholder="Enter Movie Title"
        className="btn"
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        required
      />

      <textarea
        placeholder="description"
        className="btn"
        name="description"
        value={formData.description}
        onChange={handleChange}
        required
      />
      <input
        placeholder="release year"
        className="btn"
        type="number"
        name="releaseYear"
        min="2000"
        step="1"
        value={formData.releaseYear}
        onChange={handleChange}
        required
      />
      <input
        placeholder="genre"
        className="btn"
        type="text"
        name="genre"
        value={formData.genre}
        onChange={handleChange}
        required
      />

      <input
        className="btn"
        type="number"
        name="rating"
        value={formData.rating}
        onChange={handleChange}
        min="0"
        max="5"
        step="1"
      />
      <textarea
        placeholder="Add review"
        className="btn"
        name="review"
        value={formData.review}
        onChange={handleChange}
      />

      <div className="btn-list">
        <button className="btns" type="submit">
          {" "}
          <span>{id ? "Update Movie" : "Add Movie"}</span>
        </button>
        <button className="btns" type="button" onClick={() => navigate("/")}>
          {" "}
          <span>Cancel</span>{" "}
        </button>
      </div>
    </form>
  );
};

export default MovieForm;
