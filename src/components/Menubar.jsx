import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar'
import { useNavigate, useLocation } from 'react-router-dom';

const Menubar = () => {
    const nav = useNavigate();
    const email = sessionStorage.getItem('email');
    const location = useLocation();
    const {pathname} = location;
    const basename = process.env.PUBLIC_URL;

    const onClickLogout = (e) => {
        e.preventDefault();
        if(window.confirm('정말 로그아웃 하시겠습니까?')){
            sessionStorage.clear();
            nav('/');
        }
    }

    return (
        <>
            <Navbar expand="lg" bg="primary" data-bs-theme="dark">
                <Container fluid>
                    <Navbar.Brand href={basename} to="/">REACT</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll>
                            <Nav.Link href={basename} to="/" active={pathname==='/' && true}>Home</Nav.Link>
                            {email && <Nav.Link href={basename + '/cart'} active={pathname==='/cart' && true}>장바구니</Nav.Link>}
                            <Nav.Link href={`${basename}/post`} active={pathname.startsWith('/post') && true}>게시판</Nav.Link>
                        </Nav>
                        <Nav>
                            {email ? (
                                <>
                                    <Nav.Link href='#' active={true}>{email}</Nav.Link>
                                    <Nav.Link href='#' onClick={onClickLogout}>로그아웃</Nav.Link>
                                </>
                            ) : (
                                <Nav.Link href={basename + '/login'}
                                    active={pathname==='/login' && true}>로그인</Nav.Link>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
};

export default Menubar;
