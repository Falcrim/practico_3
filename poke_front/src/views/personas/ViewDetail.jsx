import axios from 'axios';
import { useEffect, useState } from 'react';
import { Col, Container, Row, Card, ListGroup, Nav, Image } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import NavViewMenu from '../../components/NavViewMenu';

const ViewDetail = () => {

    const { id } = useParams();

    const [nombre, setNombre] = useState('')
    const [peliculas, setPeliculas] = useState([])

    useEffect(() => {
        if (!id) return;
        getPeliculaById();
    }
        , [id]);

    const getPeliculaById = () => {
        axios.get(`http://localhost:3000/personas/${id}`)
            .then(res => {
                const persona = res.data;
                setNombre(persona.nombre);
                setPeliculas(persona.peliculas);
                console.log(persona);
            }).catch(error => {
                console.log(error);
            });
    }

    return (
        <>
        <NavViewMenu />
            <Container className="mt-3">
                <Row>
                    <Col md={8}>
                        <Card>
                            <Card.Body>
                                <Card.Title>{nombre}</Card.Title>
                                <Image src={`http://localhost:3000/personas/${id}.jpg`} rounded fluid />
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row className="mt-3">
                    <Col md={8}>
                        <Card>
                            <Card.Body>
                                <Card.Title>Movies</Card.Title>
                                <ListGroup variant="flush">
                                    {peliculas.map(pelicula => (
                                        <ListGroup.Item key={pelicula.id}>
                                            <Nav.Link href={`/peliculas/${pelicula.id}`}>
                                                <Row>
                                                    <Col md={4}>
                                                        <Image src={`http://localhost:3000/peliculas/${pelicula.id}.jpg`} rounded fluid />
                                                    </Col>
                                                    <Col md={8}>
                                                        {pelicula.titulo}
                                                    </Col>
                                                </Row>
                                            </Nav.Link>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default ViewDetail;