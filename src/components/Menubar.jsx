import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import MainRouter from './MainRouter';
import { useLocation, Link } from 'react-router-dom';

const Menubar = () => {
    const location = useLocation();
    const {pathname} = location;
    console.log(pathname);
    const basename = process.env.PUBLIC_URL;
    return (
        <>
            <Navbar expand="lg" bg="primary" data-bs-theme="dark">
                <Container fluid>
                    <Navbar.Brand as={Link} to={`${basename}`}>REACT</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll>
                            <Nav.Link as={Link} to={`${basename}`} active={pathname==='/' && true}>Home</Nav.Link>
                            <Nav.Link as={Link} to={`${basename}/cart`}
                                active={pathname==='/cart' && true}>장바구니</Nav.Link>
                        </Nav>
                        <Nav>
                            <Nav.Link as={Link} to={`${basename}/login`}
                                active={pathname==='/login' && true}>로그인</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <MainRouter />
        </>
    );
}

export default Menubar
