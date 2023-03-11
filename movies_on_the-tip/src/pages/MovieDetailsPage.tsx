import React, { useState, useEffect } from 'react'
import IMovieItem from '../models/IMovieItem';
import { LoadingStatus } from '../models/types';
import LoadingIndicator from '../components/utility/LoadingIndicator';
import { Row, Col, Alert, Badge } from 'react-bootstrap';
import Rating from '../components/utility/Rating';
import { getMovieById } from '../services/Movies';
import { RouteProps } from 'react-router-dom';

type Props = {
    movieUrl: string,
    id: string
}

const MovieDetailsPage = ({ movieUrl, id }: Props) => {

    const [movie, setMovie] = useState<IMovieItem | null>(null);
    const [status, setStatus] = useState<LoadingStatus>('LOADING');
    const [error, setError] = useState<Error | null>(null);

    let element;

    useEffect(() => {

        const fetchMovies = async () => {

            try {
                const movie = await getMovieById(movieUrl, id);
                setMovie(movie);
                setStatus('LOADED');

            } catch (error: any) {
                setError(error);
                setStatus('ERROR_LOADING');
            }
        }
        fetchMovies()

    }, [])

    switch (status) {
        case 'LOADING':
            element = (
                <LoadingIndicator size='extraLarge' message='loading movie details...' />
            );
            break;

        case 'LOADED':
            const { title,
                imdbRating,
                averageRating,
                duration,
                genres,
                releaseDate,
                contentRating,
                actors,
                storyline,
                posterurl,
                ratings } = movie as IMovieItem;

            element = (
                <Row className='my-5'>
                    <Col xs={12} lg={3} className='d-flex justify-content-center'>
                        <img
                            src={posterurl}
                            alt={title}
                            style={{ height: '30rem' }}
                        />
                    </Col>
                    <Col xs={12} lg={9} className='d-grid gap-1 px-4 my-3 text-lg'>
                        <Row>
                            <div className='d-flex justify-content-between align-items-center'>
                                <h1>{title}</h1>
                                <Rating ratings={ratings} className='text-lg' />
                            </div>
                            <hr className='my-1' />
                            <div className='mb-3 text-lg'>
                                {
                                    genres.map(
                                        (genre) => (
                                            <Badge bg="primary me-2" key={genre}>
                                                {genre}
                                            </Badge>
                                        )
                                    )
                                }
                            </div>
                        </Row>
                        <Row>
                            <Col xs={3}>Imdb Rating</Col>
                            <Col xs={9}>{imdbRating}</Col>
                        </Row>
                        <Row>
                            <Col xs={3}>Content Rating</Col>
                            <Col xs={9}>{contentRating}</Col>
                        </Row>
                        <Row>
                            <Col xs={3}>Average Rating</Col>
                            <Col xs={9}>{averageRating}</Col>
                        </Row>
                        <Row>
                            <Col xs={3}>Duration</Col>
                            <Col xs={9}>{duration}</Col>
                        </Row>
                        <Row>
                            <Col xs={3}>Actors</Col>
                            <Col xs={9}>
                                {
                                    actors.map(
                                        (actor) => (
                                            <span className='me-3' key={actor}>
                                                {actor}
                                            </span>
                                        )
                                    )
                                }
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={3}>Release Date</Col>
                            <Col xs={9}>{releaseDate}</Col>
                        </Row>
                        <Row>
                            <Col xs={3}>Story line</Col>
                            <Col xs={9}>{storyline}</Col>
                        </Row>
                    </Col>
                </Row>
            );
            break;

        case 'ERROR_LOADING':
            element = (
                <Alert variant="danger" className='my-3'>
                    {error?.message}
                </Alert>
            );
            break;
    }

    return element;
}

export default MovieDetailsPage