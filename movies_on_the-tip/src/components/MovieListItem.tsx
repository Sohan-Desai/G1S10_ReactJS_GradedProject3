import IMovieItem from '../models/IMovieItem';
import { Card, Button } from 'react-bootstrap'
import Rating from './utility/Rating';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import { Link, useParams } from 'react-router-dom'

type Props = {
    movie: IMovieItem,
    addMovieToFavourites: (movie: IMovieItem) => void
    removeMovieFromFavourites: (movie: IMovieItem) => void
    isFavourite: (id: string) => boolean
};

function MovieListItem({ movie, addMovieToFavourites, removeMovieFromFavourites, isFavourite }: Props) {

    const { id, title, poster, ratings } = movie;
    const { category } = useParams();

    return (
        <>
            <Card className='my-3' style={{ width: '20rem' }}>
                <Card.Img
                    variant="top" src={`${process.env.REACT_APP_API_BASE_URL}/img/${poster}`} alt={title}
                    style={{ height: '25rem' }}
                />
                <Card.Body>
                    <div>
                        <div className='d-flex justify-content-between align-items-center'>
                            <Card.Title>{title}</Card.Title>
                            <Link to={`/${category}/${id}`} className="btn btn-outline-secondary btn-lg">
                                Details
                            </Link>
                        </div>
                        <Rating ratings={ratings} className="text-sm" />
                    </div>
                    <div className='d-grid gap-2 my-3'>
                        {(category === "favourite") ?
                            (
                                <Button
                                    variant="btn btn-outline-secondary btn-md"
                                    onClick={() => removeMovieFromFavourites(movie)}
                                >
                                    Remove from favourites
                                    <FontAwesomeIcon icon={faHeartSolid} className='mx-3' />
                                </Button>
                            ) : (

                                <Button
                                    variant="btn btn-outline-secondary btn-md"
                                    onClick={() => addMovieToFavourites(movie)}
                                >
                                    Add to favourites
                                    {(isFavourite(movie.id)) ?
                                        (
                                            <FontAwesomeIcon icon={faHeartSolid} className='mx-3' />
                                        ) : (
                                            <FontAwesomeIcon icon={faHeart} className='mx-3' />

                                        )
                                    }
                                </Button>
                            )
                        }
                    </div>
                </Card.Body>
            </Card>
        </>
    )
}

export default MovieListItem
