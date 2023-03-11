import React, { useState } from 'react'
import { Container } from 'react-bootstrap'
import MovieList from '../components/MovieList'
import NavigationMenu from '../components/NavigationMenu'

type Props = {
    movieUrl: string
};

const HomePage = ({ movieUrl }: Props) => {

    const [query, setQuery] = useState<string>("");

    const getSearchQuery = (val: string) =>{
        setQuery(val);
    }

    console.log(query)

    return (
        <div>
            <NavigationMenu onInputChange={getSearchQuery} />
            <Container>
                <MovieList movieUrl={movieUrl} query={query} />
            </Container>
        </div>
    )
}

export default HomePage
