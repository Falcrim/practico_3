import axios from "axios";
import { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import NavViewMenu from "../../components/NavViewMenu";
import { Link } from "react-router-dom";
import moment from "moment";
// import moment from "moment";
// import { generoForDisplay } from "../../utils/stringUtils";

const ViewPeliculas = () => {
    const [ListaPeliculas, setListaPeliculas] = useState([]);
    useEffect(() => {
        getListaPeliculas();
        document.title = "Prueba título";
    }, [])

    const getListaPeliculas = () => {
        axios.get('http://localhost:3000/peliculas')
            .then(res => {
                setListaPeliculas(res.data);
                // console.log(res.data);
            }).catch(error => {
                console.log(error);
            });
    }

    return (
        <>
            <NavViewMenu />
            <Container className="mt-3 mb-3">
                {ListaPeliculas.length > 0 && (
                    <Row>
                        {ListaPeliculas.map((pelicula) => (
                            <Col key={pelicula.id} md={4} className="mb-4">
                                <Card style={{ alignItems: 'center', justifyContent: 'center' }}>
                                    <Card.Img variant="top" src={"http://localhost:3000/peliculas/" + pelicula.id + ".jpg"} alt="Foto de pelicula" style={{ width: '15rem',height: '15rem' , alignItems: 'center' }} />
                                    <Card.Body>
                                        <Card.Title>{pelicula.titulo}</Card.Title>
                                        <Card.Text>
                                            {moment(pelicula.fecha_estreno).format('DD/MM/YYYY')}
                                        </Card.Text>
                                        <Card.Text>
                                            {pelicula.sinopsis}
                                        </Card.Text>
                                        <Card.Text>
                                            {pelicula.trailer}
                                        </Card.Text>
                                        <Card.Text>
                                            {pelicula.rotten_tomatoes}
                                        </Card.Text>
                                        <Link className="btn btn-primary" to={"/peliculas/" + pelicula.id}>Ver detalles</Link>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                )}
            </Container>
        </>
    );
}

export default ViewPeliculas;