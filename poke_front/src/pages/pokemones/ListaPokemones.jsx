import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row, Table } from "react-bootstrap";
import NavMenu from "../../components/NavMenu";
import { Link } from "react-router-dom";
// import moment from "moment";
// import { generoForDisplay } from "../../utils/stringUtils";

const ListaPokemones = () => {
    const [ListaPokemones, setListaPokemones] = useState([]);
    useEffect(() => {
        getListaPokemones();
        document.title = "Prueba título";
    }, [])

    const getListaPokemones = () => {
        axios.get('http://localhost:3000/pokemon')
            .then(res => {
                setListaPokemones(res.data);
                console.log(res.data, "Lita de Pokemones");
            }).catch(error => {
                console.log(error);
            });
    }
    const eliminar = (id) => {
        const confirm = window.confirm("¿Está seguro de eliminar el registro?");
        if (!confirm) {
            return;
        }
        axios.delete(`http://localhost:3000/pokemon/delete/${id}`)
            .then(res => {
                console.log(res.data);
                getListaPokemones();
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
                                    <h2>Lista de Pokemones</h2>
                                </Card.Title>
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Nombre</th>
                                            <th>Nro Pokedex</th>
                                            <th>Tipo</th>
                                            <th>Habilidad</th>
                                            <th>LvL Evol</th>
                                            <th>Prev Evol</th>
                                            <th>Post Evol</th>
                                            <th>Descripcion</th>
                                            <th>Stats</th>
                                            <th></th>
                                            <th></th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {ListaPokemones.map(pokemon =>
                                            <tr key={pokemon.id}>
                                                <td>
                                                    <img src={"http://localhost:3000/" + pokemon.id + ".jpg"} alt="Foto de perfil" width="100" />
                                                </td>
                                                <td>{pokemon.nombre}</td>
                                                <td>{pokemon.numero}</td>
                                                <td>
                                                    {pokemon.tipo1.nombre}
                                                    {pokemon.tipo2 ? " - " + pokemon.tipo2.nombre : ""}
                                                </td>
                                                <td>
                                                    {pokemon.habilidad1.nombre}
                                                    {pokemon.habilidad2 ? " - " + pokemon.habilidad2.nombre : ""}
                                                    {pokemon.habilidad3 ? " - " + pokemon.habilidad3.nombre : ""}
                                                </td>
                                                <td>{pokemon.lvlEvolucion ? pokemon.lvlEvolucion : "No tiene"}</td>
                                                <td>{pokemon.evolucionPrev ? pokemon.evolucionPrev.nombre : "No tiene"}</td>
                                                <td>{pokemon.evolucionPost ? pokemon.evolucionPost.nombre : "No tiene"}</td>
                                                <td>{pokemon.descripcion}</td>
                                                <td>
                                                    {"Hp: - " + pokemon.hp}
                                                    <br />
                                                    {"Ataque: - " + pokemon.ataque}
                                                    <br />
                                                    {"Defensa: - " + pokemon.defensa}
                                                    <br />
                                                    {"Sp. Ataque: - " + pokemon.spAtaque}
                                                    <br />
                                                    {"Sp. Defensa: - " + pokemon.spDefensa}
                                                    <br />
                                                    {"Velocidad: - " + pokemon.velocidad}
                                                    <br />
                                                </td>
                                                <td><Link className="btn btn-primary" to={"/adm/pokemon/" + pokemon.id}>Editar</Link></td>
                                                <td><Link className="btn btn-success" to={"/adm/pokemon/" + pokemon.id + "/foto"}>Foto</Link></td>
                                                <td><Button variant="danger" onClick={() => { eliminar(pokemon.id) }}>Eliminar</Button></td>
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

export default ListaPokemones;