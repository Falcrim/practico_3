import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row, Table } from "react-bootstrap";
import NavMenu from "../../components/NavMenu";
import { Link } from "react-router-dom";
// import moment from "moment";
// import { generoForDisplay } from "../../utils/stringUtils";

const ListaPersonas = () => {
    const [ListaPersonas, setListaPersonas] = useState([]);
    useEffect(() => {
        getListaPersonas();
        document.title = "Prueba título";
    }, [])

    const getListaPersonas = () => {
        axios.get('http://localhost:3000/personas')
            .then(res => {
                setListaPersonas(res.data);
                // console.log(res.data);
            }).catch(error => {
                console.log(error);
            });
    }
    const eliminar = (id) => {
        const confirm = window.confirm("¿Está seguro de eliminar el registro?");
        if (!confirm) {
            return;
        }
        axios.delete(`http://localhost:3000/personas/${id}`)
            .then(res => {
                console.log(res.data);
                getListaPersonas();
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
                                    <h2>Lista de Personas</h2>
                                </Card.Title>
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>Foto</th>
                                            <th>ID</th>
                                            <th>Nombre</th>
                                            <th></th>
                                            <th></th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {ListaPersonas.map(persona =>
                                            <tr key={persona.id}>
                                                <td>
                                                    <img src={"http://localhost:3000/personas/" + persona.id + ".jpg"} alt="Foto de perfil" width="100" />
                                                </td>
                                                <td>{persona.id}</td>
                                                <td>{persona.nombre}</td>
                                                <td><Link className="btn btn-success" to={"/adm/personas/" + persona.id + "/foto"}>Foto de Perfil</Link></td>
                                                <td><Link className="btn btn-primary" to={"/adm/personas/" + persona.id}>Editar</Link></td>
                                                <td><Button variant="danger" onClick={() => { eliminar(persona.id) }}>Eliminar</Button></td>
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

export default ListaPersonas;