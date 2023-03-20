import React, { useState, useEffect } from 'react'
import IMovieItem from '../models/IMovieItem';
import { LoadingStatus } from '../models/types';
import LoadingIndicator from '../components/utility/LoadingIndicator';
import { Row, Col, Alert, Button, Badge, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import Rating from '../components/utility/Rating';
import { getMovieById } from '../services/Movies';
import { useParams, useNavigate } from 'react-router-dom';

type Props = {

}

const MovieDetailsPage = () => {

    const [movie, setMovie] = useState<IMovieItem | null>(null);
    const [status, setStatus] = useState<LoadingStatus>('LOADING');
    const [error, setError] = useState<Error | null>(null);
    const [modalShow, setModalshow] = useState<boolean | undefined>(false);

    const params = useParams();
    const navigate = useNavigate();
    const { category, id } = params;

    const handleOpenModal = () => {
        setModalshow(true)
    }

    const handleCloseModal = () => {
        setModalshow(false);
    }

    let element;

    useEffect(() => {

        const fetchMovies = async () => {

            try {
                const movie = await getMovieById(category, id);
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
            const {
                title,
                imdbRating,
                averageRating,
                duration,
                genres,
                releaseDate,
                contentRating,
                actors,
                storyline,
                poster,
                ratings
            } = movie as IMovieItem;

            element = (
                <>
                    <Row className='my-5'>
                        <Col xs={12} lg={3} className='d-flex justify-content-center'>
                            <div className='imageWrap imageBox'>
                                <img
                                    src={`${process.env.REACT_APP_API_BASE_URL}/img/${poster}`}
                                    alt={title}
                                    className="detailsImage"
                                />
                                <div className='bgDark' onClick={() => handleOpenModal()}></div>
                            </div>
                        </Col>
                        <Col xs={12} lg={9} className='d-grid gap-1 px-5 my-3 text-lg'>
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
                                                <span className='me-3' key={actor}>{actor}</span>
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
                    {
                        modalShow && (
                            <div className='lightBox'>
                                <FontAwesomeIcon
                                    icon={faCircleXmark}
                                    className='btnClose'
                                    onClick={handleCloseModal}
                                />
                                <div className='fullScreenImage'>
                                    <img
                                        src={`${process.env.REACT_APP_API_BASE_URL}/img/${poster}`}
                                        alt={title}
                                    />
                                </div>
                            </div>
                        )
                    }
                </>
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

    return (
        <>
            <Button
                variant="btn btn-md"
                className="back"
                onClick={() => navigate(-1)}
            >
                <FontAwesomeIcon icon={faArrowLeft} />
                <span>Back</span>
            </Button>
            <hr />
            <Container>
                {element}
            </Container>
        </>
    );
}

export default MovieDetailsPage