import { Container } from 'react-bootstrap'
import MovieList from '../components/MovieList'
import NavigationMenu from '../components/NavigationMenu'
import { useParams } from 'react-router-dom';

type Props = {

};

const HomePage = () => {

    const params = useParams();
    const {category} = params

    return (
        <div>
            <NavigationMenu />
            <Container>
                <MovieList movieUrl={category} />
            </Container>
        </div>
    )
}

export default HomePage
