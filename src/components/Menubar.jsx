import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { app } from '../firebase';
import { getAuth, signOut } from 'firebase/auth';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import NavDropdown from 'react-bootstrap/NavDropdown';
import MainRouter from './MainRouter';

const Menubar = () => {
    const [email, setEmail] = useState('');
    const auth = getAuth(app);
    const navi = useNavigate();
    const location = useLocation();
    const {pathname} = location;
    console.log(pathname);

    useEffect(() => {
        const uid = sessionStorage.getItem('uid');
        if (uid) {
            setEmail(sessionStorage.getItem('email'));
        } else {
            setEmail('');
        }
    }, [location.pathname]);

    const onClickLogout = () => {
        signOut(auth).then(() => {
            sessionStorage.clear();
            setEmail('');
            navi('/');
        });
    };

    return (
        <>
            <Navbar expand="lg" bg="primary" data-bs-theme="dark">
                <Container fluid>
                    <Navbar.Brand as={Link} to="/">REACT</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll>
                            <Nav.Link as={Link} to="/" active={pathname==='/' && true}>Home</Nav.Link>
                            {email && <Nav.Link as={Link} to="/cart" active={pathname==='/cart' && true}>장바구니</Nav.Link>}
                            <Nav.Link as={Link} to="/post" active={pathname.startsWith('/post') && true}>게시판</Nav.Link>
                        </Nav>
                        <Nav>
                            {email ? (
                                <>
                                    <Nav.Link disabled>{email}</Nav.Link>
                                    <Nav.Link onClick={onClickLogout} style={{cursor: 'pointer'}}>로그아웃</Nav.Link>
                                </>
                            ) : (
                                <Nav.Link as={Link} to="/login"
                                    active={pathname==='/login' && true}>로그인</Nav.Link>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <MainRouter />
        </>
    );
};

export default Menubar;
