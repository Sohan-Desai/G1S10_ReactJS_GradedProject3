import React, { useState, useEffect, useMemo } from 'react'
import IMovieItem from '../models/IMovieItem'
import { LoadingStatus } from '../models/types';
import LoadingIndicator from './utility/LoadingIndicator';
import { deleteMovieFromServer, getMoviesFromServer, pushMovieToServer } from '../services/Movies'
import { Row, Col, Alert } from 'react-bootstrap';
import MovieListItem from './MovieListItem';

type Props = {
  movieUrl: string
  query: string
};

const MovieList = ({ movieUrl, query }: Props) => {

  const [movies, setMovies] = useState<IMovieItem[]>([]);
  const [status, setStatus] = useState<LoadingStatus>('LOADING');
  const [error, setError] = useState<Error | null>(null);

  const filteredMovies = useMemo(() => {
    return movies.filter((movie) => {
      return movie.title.toLowerCase().includes(query.toLowerCase())
    })
  }, [movies, query]);

  const addMovieToFavourites = async (movie: IMovieItem) =>{

    try{
      const favouriteMovie = await pushMovieToServer(movie)
      console.log(favouriteMovie);
      
    } catch(error: any) {
      setError(error)
      console.log(error.message)
    }

  }

  const removeMovieFromFavourites = async (id : string) =>{

    try{
      await deleteMovieFromServer(id)

    } catch(error: any) {
      setError(error)
      console.log(error.message)
    }

  }

  let element;

  useEffect(() => {

    const fetchMovies = async () => {

      try {
        const data = await getMoviesFromServer(movieUrl);
        setMovies(data);
        setStatus('LOADED');

      } catch (error: any) {
        setError(error);
        setStatus('ERROR_LOADING');
      }
    }
    fetchMovies();

  }, [movies])

  switch (status) {
    case 'LOADING':
      element = (
        <>
          <LoadingIndicator size='large' message='loading movies...' />
        </>
      );
      break;

    case 'LOADED':
      element = (
        //create a function for element in case loaded
        <>
          {(filteredMovies.length > 0) ? (
            <Row xs={1} md={2} lg={3}>
              {
                filteredMovies.map((movie, idx) => (
                  <Col key={movie.id} className="d-flex align-items-stretch">
                    <MovieListItem movie={movie} addMovieToFavourites={addMovieToFavourites} />
                  </Col>
                ))
              }
            </Row>
          ) : (
            <Alert variant="secondary" className='my-3'>
              No movies found
            </Alert>
          )
          }
        </>
      );
      break;

    case 'ERROR_LOADING':
      element = (
        <>
          <Alert variant="danger" className='my-3'>
            {error?.message}
          </Alert>
        </>
      );
      break;
  }

  return element;
}

export default MovieList