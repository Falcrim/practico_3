import axios from "axios";
import { useEffect, useState } from "react";
import NavMenu from "../../components/NavMenu";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
// import moment from "moment";

const FormTipo = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [nombre, setNombre] = useState('')
    const [validated, setValidated] = useState(false);
    useEffect(() => {
        if (!id) return;
        getTipoById();
    }, [id])

    const getTipoById = () => {
        axios.get(`http://localhost:3000/tipo/${id}`)
            .then(res => {
                const tipo = res.data;
                setNombre(tipo.nombre);
            }).catch(error => {
                console.log(error);
            });
    }

    const onChangeNombre = (e) => {
        setNombre(e.target.value);
    }
    const onGuardarClick = (e) => {
        const form = e.currentTarget;
        e.preventDefault();
        e.stopPropagation();

        setValidated(true);

        if (form.checkValidity() === false) {
            return;
        }
        const tipo = {
            nombre
        };
        console.log(tipo);
        if (id) {
            editTipo(tipo);
        } else {
            insertTipo(tipo);
        }

    }
    const editTipo = (tipo) => {
        axios.put(`http://localhost:3000/tipo/update/${id}`, tipo)
            .then(res => {
                console.log(res.data);
                navigate('/adm/tipo');
            }).catch(error => {
                console.log(error);
            });
    }
    const insertTipo = (tipo) => {
        axios.post('http://localhost:3000/tipo', tipo)
            .then(res => {
                console.log(res.data);
                navigate('/adm/tipo');
            }).catch(error => {
                console.log(error);
            });
    }
    return (
        <>
            <NavMenu />
            <Container>
                <Row className="mt-3 mb-3">
                    <Col md={6}>
                        <Card>
                            <Card.Body>
                                <Card.Title>
                                    <h2>Formulario Tipo</h2>
                                </Card.Title>
                                <Form noValidate validated={validated} onSubmit={onGuardarClick}>
                                    <Form.Group >
                                        <Form.Label>Nombre:</Form.Label>
                                        <Form.Control required value={nombre} type="text" onChange={onChangeNombre} />
                                        <Form.Control.Feedback type="invalid">
                                            Por favor ingrese un nombre.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group className="mt-3">
                                        <Button type="submit">Guardar datos</Button>
                                    </Form.Group>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>);
}

export default FormTipo;