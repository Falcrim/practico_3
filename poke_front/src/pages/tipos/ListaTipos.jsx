import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row, Table } from "react-bootstrap";
import NavMenu from "../../components/NavMenu";
import { Link } from "react-router-dom";
// import moment from "moment";
// import { generoForDisplay } from "../../utils/stringUtils";

const ListaTipos = () => {
    const [ListaTipos, setListaTipos] = useState([]);
    useEffect(() => {
        getListaTipos();
        document.title = "Prueba título";
    }, [])

    const getListaTipos = () => {
        axios.get('http://localhost:3000/tipo')
            .then(res => {
                setListaTipos(res.data);
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
        axios.delete(`http://localhost:3000/tipo/delete/${id}`)
            .then(res => {
                console.log(res.data);
                getListaTipos();
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
                                    <h2>Lista de Tipos</h2>
                                </Card.Title>
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Nombre</th>
                                            <th></th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {ListaTipos.map(tipo =>
                                            <tr key={tipo.id}>
                                                <td>{tipo.id}</td>
                                                <td>{tipo.nombre}</td>
                                                <td><Link className="btn btn-primary" to={"/adm/tipo/" + tipo.id}>Editar</Link></td>
                                                <td><Button variant="danger" onClick={() => { eliminar(tipo.id) }}>Eliminar</Button></td>
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

export default ListaTipos;