import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

const NavMenu = () => {
    return (
        <Navbar bg="dark" data-bs-theme="dark" expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="#home">Admin</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavDropdown title="Tipos" id="basic-nav-dropdown">
                            <Link className="dropdown-item" to={"/adm/tipo"}>Lista de Tipos</Link>
                            <Link className="dropdown-item" to={"/adm/tipo/create"}>
                                Crear Tipo
                            </Link>
                        </NavDropdown>
                        <NavDropdown title="Habilidades" id="basic-nav-dropdown">
                            <Link className="dropdown-item" to={"/adm/habilidad"}>Lista de Habilidades</Link>
                            <Link className="dropdown-item" to="/adm/habilidad/create">
                                Crear Habilidad
                            </Link>
                        </NavDropdown>
                        <NavDropdown title="Pokemones" id="basic-nav-dropdown">
                            <Link className="dropdown-item" to={"/adm/pokemon"}>Lista de Pokemones</Link>
                            <Link className="dropdown-item" to="/adm/pokemon/create">
                                Crear Pokemon
                            </Link>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavMenu;