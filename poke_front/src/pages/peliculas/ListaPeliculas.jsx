import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row, Table } from "react-bootstrap";
import NavMenu from "../../components/NavMenu";
import { Link } from "react-router-dom";
// import moment from "moment";
// import { generoForDisplay } from "../../utils/stringUtils";

const ListaPeliculas = () => {
    const [ListaPeliculas, setListaPeliculas] = useState([]);
    useEffect(() => {
        getListaPeliculas();
        document.title = "Prueba título";
    }, [])

    const getListaPeliculas = () => {
        axios.get('http://localhost:3000/peliculas')
            .then(res => {
                setListaPeliculas(res.data);
                console.log(res.data[3].personas, "LIST ADM");
            }).catch(error => {
                console.log(error);
            });
    }
    const eliminar = (id) => {
        const confirm = window.confirm("¿Está seguro de eliminar el registro?");
        if (!confirm) {
            return;
        }
        axios.delete(`http://localhost:3000/peliculas/${id}`)
            .then(res => {
                console.log(res.data);
                getListaPeliculas();
            }).catch(error => {
                console.log(error);
            });
    }

    return (
        <>
            <NavMenu />
            <Container className="mt-3 mb-3">
                <Row>
                    <Col>
                        <Card>
                            <Card.Body>
                                <Card.Title>
                                    <h2>Lista de Peliculas</h2>
                                </Card.Title>
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>Foto</th>
                                            <th>Titulo</th>
                                            <th>Fecha de estreno</th>
                                            <th>Sinopsis</th>
                                            <th>Trailer</th>
                                            <th>Rotten Tomatoes</th>
                                            <th>Elenco</th>
                                            <th></th>
                                            <th></th>
                                            <th></th>
                                            {/* <th></th> */}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {ListaPeliculas.map(pelicula =>
                                            <tr key={pelicula.id}>
                                                <td>
                                                    <img src={"http://localhost:3000/peliculas/" + pelicula.id + ".jpg"} alt="Foto de perfil" width="100" />
                                                </td>
                                                <td>{pelicula.titulo}</td>
                                                <td>{pelicula.fecha_estreno}</td>
                                                <td>{pelicula.sinopsis}</td>
                                                <td>{pelicula.trailer}</td>
                                                <td>{pelicula.rotten_tomatoes}</td>
                                                {/* <td>{pelicula.personas.map(persona =>
                                                    <div key={persona.id}>
                                                        {persona.person_movie.role}: {persona.nombre}
                                                        <br /><br />
                                                    </div>
                                                )}</td> */}
                                                <td><Link className="btn btn-primary" to={"/adm/peliculas/" + pelicula.id + "/reparto"}>Añadir reparto</Link></td>
                                                <td><Link className="btn btn-success" to={"/adm/peliculas/" + pelicula.id + "/foto"}>Foto de Perfil</Link></td>
                                                <td><Link className="btn btn-primary" to={"/adm/peliculas/" + pelicula.id}>Editar</Link></td>
                                                <td><Button variant="danger" onClick={() => { eliminar(pelicula.id) }}>Eliminar</Button></td>
                                            </tr>
                                        )}
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container >
        </>
    );
}

export default ListaPeliculas;