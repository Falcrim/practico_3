import axios from "axios";
import { useEffect, useState } from "react";
import NavMenu from "../../components/NavMenu";
import { Alert, Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";

const FormPelicula = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [titulo, setTitulo] = useState('')
    const [fecha_estreno, setFechaEstreno] = useState('')
    const [sinopsis, setSinopsis] = useState('')
    const [trailer, setTrailer] = useState('')
    const [rotten_tomatoes, setRottenTomatoes] = useState('')
    const [errorText, setErrorText] = useState('')
    const [validated, setValidated] = useState(false);

    useEffect(() => {
        if (!id) return;
        getPeliculaById();
    }, [id])
    const getPeliculaById = () => {
        axios.get(`http://localhost:3000/peliculas/${id}`)
            .then(res => {
                const pelicula = res.data;
                setTitulo(pelicula.titulo);
                setFechaEstreno(pelicula.fecha_estreno);
                setSinopsis(pelicula.sinopsis);
                setTrailer(pelicula.trailer);
                setRottenTomatoes(pelicula.rotten_tomatoes);
            }).catch(error => {
                console.log(error);
            });
    }

    const onChangeTitulo = (e) => {
        setTitulo(e.target.value);
    }
    const onGuardarClick = (e) => {
        const form = e.currentTarget;
        e.preventDefault();
        e.stopPropagation();

        setValidated(true);

        if (form.checkValidity() === false) {
            return;
        }

        setErrorText('');
        const pelicula = {
            titulo,
            fecha_estreno,
            sinopsis,
            trailer,
            rotten_tomatoes
        };
        console.log(pelicula);
        if (id) {
            editPelicula(pelicula);
        } else {
            insertPelicula(pelicula);
        }

    }
    const editPelicula = (pelicula) => {
        axios.patch(`http://localhost:3000/peliculas/${id}`, pelicula)
            .then(res => {
                console.log(res.data);
                navigate('/adm/peliculas');
            }).catch(error => {
                const errorMsg = error.response.data.msg;
                setErrorText(errorMsg);
                console.log(error);
            });
    }
    const insertPelicula = (pelicula) => {
        console.log('insert', pelicula);
        axios.post('http://localhost:3000/peliculas', pelicula)
            .then(res => {
                console.log(res.data);
                navigate('/adm/peliculas');
            }).catch(error => {
                console.log(error);
            });
    }

    const onChangeTrailer = (e) => {
        //every link its gonna come with the format "https://www.youtube.com/watch?v=Xn3kOciU0s0" i want to change it to "https://www.youtube.com/embed/Xn3kOciU0s0"
        const link = e.target.value;
        const linkArray = link.split("=");
        const newLink = `https://www.youtube.com/embed/${linkArray[1]}`;
        setTrailer(newLink);
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
                                    <h2>Formulario Pelicula</h2>
                                </Card.Title>
                                <Form noValidate validated={validated} onSubmit={onGuardarClick}>
                                    {errorText && <Alert variant="danger">{errorText}</Alert>}
                                    <Form.Group >
                                        <Form.Label>Titulo:</Form.Label>
                                        <Form.Control required value={titulo} type="text" onChange={onChangeTitulo} />
                                        <Form.Control.Feedback type="invalid">
                                            Por favor ingrese un titulo.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group >
                                        <Form.Label>Fecha Estreno:</Form.Label>
                                        <Form.Control required value={moment(fecha_estreno).format('yyyy-MM-DD')} type="date" onChange={(e) => {
                                            setFechaEstreno(e.target.value);
                                        }} />
                                        <Form.Control.Feedback type="invalid">
                                            Por favor ingrese una fecha válida.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group >
                                        <Form.Label>Sinopsis:</Form.Label>
                                        <Form.Control required value={sinopsis} as="textarea" rows={3} onChange={(e) => {
                                            setSinopsis(e.target.value);
                                        }} />
                                        <Form.Control.Feedback type="invalid">
                                            Por favor ingrese una sinopsis.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group >
                                        <Form.Label>Trailer:</Form.Label>
                                        <Form.Control required value={trailer} type="text" onChange={onChangeTrailer} />
                                        <Form.Control.Feedback type="invalid">
                                            Por favor ingrese un trailer.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    {/* formulario de rotten tomatoes para decimal */}
                                    <Form.Group >
                                        <Form.Label>Rotten Tomatoes:</Form.Label>
                                        <Form.Control required value={rotten_tomatoes} type="number" onChange={(e) => {
                                            setRottenTomatoes(e.target.value);
                                        }} />
                                        <Form.Control.Feedback type="invalid">
                                            Por favor ingrese un valor numérico.
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

export default FormPelicula;