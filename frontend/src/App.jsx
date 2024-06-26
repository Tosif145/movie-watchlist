// src/App.js

import React from 'react';
import { BrowserRouter , Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import MovieForm from './components/MovieForm'; // Assuming MovieForm is used for Add/Edit
import MovieDetails from './components/MovieDetails'; // Assuming MovieDetails is used for displaying details
import Card from './components/Card';

const App = () => {
  return (
    <BrowserRouter>
    <div className="App">
       
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/addMovie" element={<MovieForm />} />
          <Route path="/movies/:id/rate" element={<MovieForm />} />
          <Route path="/movies/details/:id" element={<MovieDetails />} />
        </Routes>
         
    </div>
    </BrowserRouter>
  );
};

export default App;
