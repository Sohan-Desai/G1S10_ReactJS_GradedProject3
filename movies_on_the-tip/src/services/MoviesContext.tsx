import { createContext, useContext, useState, useMemo } from 'react';
import IMovieItem from '../models/IMovieItem';
import { getMoviesFromServer } from './Movies';

type MovieContextInterface = {
  favourites: IMovieItem[];
  setFavourites: (value: IMovieItem[]) => void;
  query: string;
  setQuery: (value: string) => void;
  error: Error | null;
  setError: (value: Error) => void;
  addToFavourite: (value: IMovieItem) => void;
  removeFromFavourite: (value: IMovieItem) => void;
  getSearchQuery: (value: string) => void;
};

export const MovieContext = createContext<MovieContextInterface>({
  favourites: [],
  setFavourites: () => { },
  query: "",
  setQuery: () => { },
  error: null,
  setError: () => { },
  addToFavourite: () => { },
  removeFromFavourite: () => { },
  getSearchQuery: () => { }
});

type Props = {
  children: React.ReactNode;
};

export const MovieContextProvider: React.FC<Props> = ({ children }) => {

  const [favourites, setFavourites] = useState<IMovieItem[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [query, setQuery] = useState<string>("");

  useMemo(() => {

    const fetchFavouriteMovies = async () => {

      try {
        const data = await getMoviesFromServer('favourite');
        setFavourites(data);
        console.log("Inside fetchFavouriteMovies");

      } catch (error: any) {
        setError(error);
        console.log(error.message);
      }
    }
    fetchFavouriteMovies();

  }, [])

  const addToFavourite = (favouriteMovie: IMovieItem) => {
    setFavourites([...favourites, favouriteMovie])
  }

  const removeFromFavourite = (favouriteMovie: IMovieItem) => {
    setFavourites(favourites.filter((movie) => movie.id !== favouriteMovie.id))
  }

  const isFavourite = (id: string) => {
    return favourites.some((movie) => movie.id === id);
  }

  const getSearchQuery = (val: string) => {
    setQuery(val);
  }

  const contextValue = {
    favourites,
    setFavourites,
    error,
    setError,
    query,
    setQuery,
    addToFavourite,
    removeFromFavourite,
    getSearchQuery
  }

  return (
    <MovieContext.Provider value={contextValue}>
      {children}
    </MovieContext.Provider>
  );
};

export const useGlobalContext = () => {
  const globalContext = useContext(MovieContext);

  if (globalContext === undefined) {
    throw new Error('MovieContext must be within MovieContextProvider');
  }

  return globalContext;
}