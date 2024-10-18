import axios from 'axios';
import { useEffect, useState } from 'react';
import { Col, Container, Row, Card, ListGroup, Nav } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import NavViewMenu from '../../components/NavViewMenu';

const ViewDetail = () => {

    const { id } = useParams();

    const [titulo, setTitulo] = useState('')
    const [fecha_estreno, setFechaEstreno] = useState('')
    const [sinopsis, setSinopsis] = useState('')
    const [trailer, setTrailer] = useState('')
    const [rotten_tomatoes, setRottenTomatoes] = useState('')
    const [elenco, setElenco] = useState([])

    useEffect(() => {
        if (!id) return;
        getPeliculaById();
    }
        , [id]);

    const getPeliculaById = () => {
        axios.get(`http://localhost:3000/peliculas/${id}`)
            .then(res => {
                const pelicula = res.data;
                setTitulo(pelicula.titulo);
                setFechaEstreno(pelicula.fecha_estreno);
                setSinopsis(pelicula.sinopsis);
                setTrailer(pelicula.trailer);
                setRottenTomatoes(pelicula.rotten_tomatoes);
                setElenco(pelicula.personas);
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
                                <Card.Title>{titulo}</Card.Title>
                                <Card.Text>
                                    <strong>Release Date:</strong> {new Date(fecha_estreno).toLocaleDateString()}
                                </Card.Text>
                                <Card.Text>
                                    <strong>Synopsis:</strong> {sinopsis}
                                </Card.Text>
                                <Card.Text>
                                    <iframe width="560" height="315" src={trailer} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                                </Card.Text>
                                <Card.Text>
                                    <strong>Rotten Tomatoes Score:</strong> {rotten_tomatoes}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card>
                            <Card.Body>
                                <Card.Title>Cast</Card.Title>
                                <ListGroup variant="flush">
                                    {elenco.map(persona => (
                                        <ListGroup.Item key={persona.id}>
                                            <Nav.Link href={`/personas/${persona.id}`}>{persona.nombre} - {persona.person_movie.role}</Nav.Link>
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
