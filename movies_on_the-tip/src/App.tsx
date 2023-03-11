import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MovieDetails from './pages/MovieDetailsPage';
import { AppContextProvider } from './services/context';
import HomePage from './pages/HomePage';

function App() {
  return (
    <div className="App">
      <AppContextProvider>
          <Routes>
            <Route path='/movies-coming/:id' element={<MovieDetails movieUrl='movies-coming' id='2' />} />
            <Route path='/movies-coming' element={<HomePage movieUrl='movies-coming' />} />

            <Route path='/movies-in-theaters/:id' element={<MovieDetails movieUrl='movies-in-theaters' id='96'/>} />
            <Route path='/movies-in-theaters' element={<HomePage movieUrl='movies-in-theaters' />} />

            <Route path='/top-rated-movies/:id' element={<MovieDetails movieUrl='top-rated-movies' id='371' />} />
            <Route path='/top-rated-movies' element={<HomePage movieUrl='top-rated-movies' />} />

            <Route path='/top-rated-india/:id' element={<MovieDetails movieUrl='top-rated-india' id='120' />} />
            <Route path='/top-rated-india' element={<HomePage movieUrl='top-rated-india' />} />

            <Route path='/favourite/:id' element={<MovieDetails movieUrl='favourite' id='98' />} />
            <Route path='/favourite' element={<HomePage movieUrl='favourite' />} />
          </Routes>
      </AppContextProvider>
    </div>
  );
}

export default App;
