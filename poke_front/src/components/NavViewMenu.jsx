import { useState } from "react";
import { Container, Navbar, Form, FormControl, Button } from "react-bootstrap";
// import { Link } from "react-router-dom";

const NavMenu = () => {
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = (event) => {
        event.preventDefault();
        // Perform search action here
        console.log("Searching for:", searchQuery);
        
    };

    return (
        <Navbar bg="dark" data-bs-theme="dark" expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="/peliculas">Cartelera</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Form className="d-flex" onSubmit={handleSearch}>
                    <FormControl
                        type="search"
                        placeholder="Search Pokémon"
                        className="me-2"
                        aria-label="Search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Button variant="outline-success" type="submit">Search</Button>
                </Form>
            </Container>
        </Navbar>
    );
}

export default NavMenu;