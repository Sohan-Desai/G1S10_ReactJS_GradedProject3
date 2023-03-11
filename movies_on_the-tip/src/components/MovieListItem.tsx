import React from 'react'
import { Card, Button } from 'react-bootstrap'
import Rating from './utility/Rating';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import IMovieItem from '../models/IMovieItem';
import { Link } from 'react-router-dom'

type Props = {
    movie: IMovieItem,
    addMovieToFavourites: (movie: IMovieItem) => void
};

function MovieListItem({ movie, addMovieToFavourites }: Props) {

    const { id, title, posterurl, ratings } = movie;

    const handleClick = () =>{
        // should branch between add and delete
        addMovieToFavourites(movie);
    }

    return (
        <>
            <Card className='my-3' style={{ width: '20rem' }}>
                <Card.Img
                    variant="top" src={posterurl} alt={title}
                    style={{ height: '25rem' }}
                />
                <Card.Body>
                    <div>
                        <div className='d-flex justify-content-between align-items-center'>
                            <Card.Title>{title}</Card.Title>
                            <Link to={`/movies-in-theaters/${id}`} className="btn btn-outline-secondary btn-lg">
                                Details
                            </Link>
                        </div>
                        <Rating ratings={ratings} className="text-sm" />
                    </div>
                    <div className='d-grid gap-2 my-3'>
                        <Button
                            variant="btn btn-outline-secondary btn-lg"
                            onClick={handleClick}
                        >
                            Add to favourites
                            <FontAwesomeIcon icon={faHeart} className='mx-3' />
                        </Button>
                    </div>
                </Card.Body>
            </Card>
        </>
    )
}

export default MovieListItem
