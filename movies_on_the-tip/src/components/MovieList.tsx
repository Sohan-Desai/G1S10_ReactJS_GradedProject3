import React, { useState, useEffect, useMemo } from 'react'
import IMovieItem from '../models/IMovieItem'
import { LoadingStatus, ResponeStatus } from '../models/types';
import LoadingIndicator from './utility/LoadingIndicator';
import { deleteMovieFromServer, getMoviesFromServer, pushMovieToServer } from '../services/Movies'
import { Row, Col, Alert } from 'react-bootstrap';
import MovieListItem from './MovieListItem';
import { useGlobalContext } from '../services/MoviesContext';
import { toast, ToastContainer } from 'react-toastify';

type Props = {
  movieUrl: string | undefined
};

const MovieList = ({ movieUrl }: Props) => {

  const { query, favourites, addToFavourite, removeFromFavourite } = useGlobalContext();

  const [movies, setMovies] = useState<IMovieItem[]>([]);
  const [loadStatus, setLoadstatus] = useState<LoadingStatus>('LOADING');
  const [error, setError] = useState<Error | null>(null);

  const filteredMovies = useMemo(() => {
    return movies.filter((movie) => {
      return movie.title.toLowerCase().includes(query.toLowerCase())
    })
  }, [movies, query]);

  const addMovieToFavourites = async (movie: IMovieItem) => {

    try {
      if (isFavourite(movie.id)) {
        notify('EXISTS', `${movie.title} is already added to favourites!`)

      } else {
        const favouriteMovie = await pushMovieToServer(movie)
        addToFavourite(favouriteMovie)
        notify('SUCCESS', `${movie.title} is added to favourites`)
      }
    } catch (error: any) {
      setError(error)
      notify('ERROR', error.message)

    }
  }

  const removeMovieFromFavourites = async (movie: IMovieItem) => {

    try {
      await deleteMovieFromServer(movie.id)
      removeFromFavourite(movie)
      notify('SUCCESS', `${movie.title} is removed from favourites`)

    } catch (error: any) {
      setError(error)
      notify('ERROR', error.message)

    }
  }

  const isFavourite = (id: string) => {
    return favourites.some((movie) => movie.id === id);
  }

  const notify = (responseStatus: ResponeStatus, toastMessage: string) => {
    switch (responseStatus) {
      case 'SUCCESS':
        return toast.success(toastMessage);

      case 'EXISTS':
        return toast.info(toastMessage);

      case 'ERROR':
        return toast.error(toastMessage);
    }
  }

  useEffect(() => {

    const fetchMovies = async () => {

      try {
        const data = await getMoviesFromServer(movieUrl);
        setMovies(data);
        setLoadstatus('LOADED');

      } catch (error: any) {
        setError(error);
        setLoadstatus('ERROR_LOADING');
      }
    }
    fetchMovies();

  }, [movieUrl, favourites])

  let element;

  switch (loadStatus) {
    case 'LOADING':
      element = (
        <>
          <LoadingIndicator size='large' message='loading movies...' />
        </>
      );
      break;

    case 'LOADED':
      element = (
        <>
          <ToastContainer
            autoClose={2000}
            closeOnClick={true}
            limit={5}
            hideProgressBar={true}
            position={'top-right'}
          />
          {(filteredMovies.length > 0) ? (
            <Row xs={1} md={2} lg={4}>
              {
                filteredMovies.map((movie, idx) => (
                  <Col key={movie.id} className="d-flex align-items-stretch">
                    <MovieListItem
                      movie={movie}
                      addMovieToFavourites={addMovieToFavourites}
                      removeMovieFromFavourites={removeMovieFromFavourites}
                      isFavourite={isFavourite}
                    />
                  </Col>
                ))
              }
            </Row>
          ) : (
            <div className='noResults'>
              <p>No movies found</p>
            </div>
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