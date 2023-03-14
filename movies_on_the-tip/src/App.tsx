import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import MovieDetails from './pages/MovieDetailsPage';
import HomePage from './pages/HomePage';
import { MovieContextProvider } from './services/MoviesContext';

function App() {
  return (
    <div className="App">
      <MovieContextProvider>
        <Routes>
          <Route path='/:category/:id' element={<MovieDetails />} />
          <Route path='/:category' element={<HomePage />} />
          <Route path='*' element={<Navigate to='/movies-in-theaters' />} />
        </Routes>
      </MovieContextProvider>
    </div>
  );
}

export default App;
