import { Navbar, Nav, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const NavBar = () => {
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container fluid>
                <Navbar.Brand as={NavLink} to="/">
                    TodoApp
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <Nav.Link as={NavLink} to="/">
                            Home
                        </Nav.Link>

                        {/* {localStorage.getItem("jwtToken") ? (
                            <Nav.Link as={NavLink} to="/profile">
                                Profile
                            </Nav.Link>
                        ) : (
                            <Nav.Link as={NavLink} to="/login">
                                Login
                            </Nav.Link>
                        )} */}

                        <Nav.Link as={NavLink} to="/login">
                            Login
                        </Nav.Link>
                        <Nav.Link as={NavLink} to="/profile">
                            Profile
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavBar;
