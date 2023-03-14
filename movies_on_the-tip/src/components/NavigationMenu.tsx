import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { faClapperboard, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';
import { useGlobalContext } from '../services/MoviesContext';

type Props = {

}

const NavigationMenu = () => {

    const { getSearchQuery } = useGlobalContext();
    const [debouncedValue, setDebouncedValue] = useState<string>('')

    useEffect(() => {
      const timer = setTimeout(() => getSearchQuery(debouncedValue), 800)
  
      return () => {
        clearTimeout(timer)
      }
    }, [debouncedValue])
  

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDebouncedValue(event.target.value);
    }

    return (
        <>
            <Navbar bg="light" expand="lg" sticky='top'>
                <Container fluid>
                    <FontAwesomeIcon icon={faClapperboard} className="fa-2x me-2" />
                    <Navbar.Brand>Movies on the Tip</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >
                            <Nav.Link to={'/movies-in-theaters'} as={NavLink}>Movies in theatres</Nav.Link>
                            <Nav.Link to={'/movies-coming'} as={NavLink}>Coming soon</Nav.Link>
                            <Nav.Link to={'/top-rated-india'} as={NavLink}>Top Rated Indian</Nav.Link>
                            <Nav.Link to={'/top-rated-movies'} as={NavLink}>Top rated movies</Nav.Link>
                            <Nav.Link to={'/favourite'} as={NavLink}>Favourites</Nav.Link>
                        </Nav>
                        <Form className="d-flex justify-content-center">
                            <div className='search me-3'>
                                <div className='icon'>
                                    <FontAwesomeIcon icon={faSearch} className='searchIcon' />
                                </div>
                                <div className='input'>
                                    <div className='mySearch'>
                                        <input
                                            type="search"
                                            placeholder="Search for movies..."
                                            className="me-2"
                                            aria-label="Search"
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                            </div>
                        </Form>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default NavigationMenu
