import React, { useState, useEffect, useMemo } from 'react'
import IMovieItem from '../models/IMovieItem'
import { LoadingStatus, ResponeStatus } from '../models/types';
import LoadingIndicator from './utility/LoadingIndicator';
import { deleteMovieFromServer, getMoviesFromServer, pushMovieToServer } from '../services/Movies'
import { Row, Col, Alert, Toast, ToastContainer } from 'react-bootstrap';
import MovieListItem from './MovieListItem';
import { useGlobalContext } from '../services/MoviesContext';

type Props = {
  movieUrl: string | undefined
};

const MovieList = ({ movieUrl }: Props) => {

  const { query, favourites, addToFavourite, removeFromFavourite } = useGlobalContext();

  const [movies, setMovies] = useState<IMovieItem[]>([]);
  const [loadStatus, setLoadstatus] = useState<LoadingStatus>('LOADING');
  const [responseStatus, setResponesstatus] = useState<ResponeStatus>('INITIAL');
  const [error, setError] = useState<Error | null>(null);
  const [toastMessage, setToastmessage] = useState<String>('');
  const [showToast, setShowtoast] = useState<boolean>(false);

  const filteredMovies = useMemo(() => {
    return movies.filter((movie) => {
      return movie.title.toLowerCase().includes(query.toLowerCase())
    })
  }, [movies, query]);

  const addMovieToFavourites = async (movie: IMovieItem) => {

    try {
      if (isFavourite(movie.id)) {
        setToastmessage(`${movie.title} is already added to favourites!`)
        setResponesstatus('EXISTS')
      } else {
        const favouriteMovie = await pushMovieToServer(movie)
        addToFavourite(favouriteMovie)
        setToastmessage(`${movie.title} is added to favourites`)
        setResponesstatus('SUCCESS')
      }
    } catch (error: any) {
      setError(error)
      setToastmessage(error.message)
      setResponesstatus('ERROR')

    } finally {
      setShowtoast(true)
    }

  }

  const removeMovieFromFavourites = async (movie: IMovieItem) => {

    try {
      await deleteMovieFromServer(movie.id)
      removeFromFavourite(movie)
      setResponesstatus('SUCCESS')
      setToastmessage(`${movie.title} is removed from favourites`)

    } catch (error: any) {
      setError(error)
      setToastmessage(error.message)
      setResponesstatus('ERROR')

    } finally {
      setShowtoast(true)
    }

  }

  const isFavourite = (id: string) => {
    return favourites.some((movie) => movie.id === id);
  }

  useEffect(() => {

    const fetchMovies = async () => {

      try {
        const data = await getMoviesFromServer(movieUrl);
        setMovies(data);
        setLoadstatus('LOADED');
        console.log("Inside fetchMovies");

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
          <ToastContainer />
          {(filteredMovies.length > 0) ? (
            <Row xs={1} md={2} lg={3}>
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
          {
            responseStatus !== 'INITIAL' && (

              <ToastContainer className="p-3" position='top-end'>
                <Toast
                  bg={responseStatus === 'SUCCESS' ? 'light' : 'warning'}
                  show={showToast}
                  autohide
                  delay={2400}
                  onClose={() => setShowtoast(false)}
                >
                  <Toast.Header closeButton={false}>
                    <strong className="me-auto">
                      {responseStatus === 'SUCCESS' ? 'Alright!' : 'Whoops!'}
                    </strong>
                  </Toast.Header>
                  <Toast.Body>{toastMessage}</Toast.Body>
                </Toast>
              </ToastContainer>
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