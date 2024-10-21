import { useEffect, useState } from "react";
import { Container, Row, Col, Card, ListGroup, ListGroupItem } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const PokemonDetail = () => {
    const { id } = useParams();
    const [pokemon, setPokemon] = useState(null);
    const [evolutionChain, setEvolutionChain] = useState([]);

    useEffect(() => {
        if (!id) {
            return;
        }
        fetchPokemonData();
        parseEvolutionChain();
    }, [id]);

    const fetchPokemonData = async () => {
        axios.get(`http://localhost:3000/pokemon/${id}`)
            .then(res => {
                setPokemon(res.data);
                // console.log(res.data, "POKEMON DATA");
                // fetchEvolutionChain(res.data.species.url);
            }).catch(error => {
                console.log(error);
            });
    };

    const parseEvolutionChain = async () => {
        axios.get(`http://localhost:3000/pokemon/linea/${id}`)
            .then(res => {
                setEvolutionChain(res.data);
                console.log(res.data, "EVOLUTION CHAIN");
            }).catch(error => {
                console.log(error);
            });
    };

    const calculateStats = (base_stat, level, isHP = false) => {
        const IV = 31;
        const EV = 252;
        if (isHP) {
            const min = Math.floor(((2 * base_stat + 0 + (0 / 4)) * level / 100) + level + 10);
            const max = Math.floor(((2 * base_stat + IV + (EV / 4)) * level / 100) + level + 10);
            return { min, max };
        } else {
            const min = Math.floor(((((2 * base_stat + 0 + (0 / 4)) * level / 100) + 5) * 0.9));
            const max = Math.floor(((((2 * base_stat + IV + (EV / 4)) * level / 100) + 5) * 1.1));
            return { min, max };
        }
    };

    if (!pokemon) {
        return <div>Loading...</div>;
    }

    const statsLevel50 = {
        hp: calculateStats(pokemon.hp, 50, true),
        ataque: calculateStats(pokemon.ataque, 50),
        defensa: calculateStats(pokemon.defensa, 50),
        spAtaque: calculateStats(pokemon.spAtaque, 50),
        spDefensa: calculateStats(pokemon.spDefensa, 50),
        velocidad: calculateStats(pokemon.velocidad, 50),
    };

    const statsLevel100 = {
        hp: calculateStats(pokemon.hp, 100, true),
        ataque: calculateStats(pokemon.ataque, 100),
        defensa: calculateStats(pokemon.defensa, 100),
        spAtaque: calculateStats(pokemon.spAtaque, 100),
        spDefensa: calculateStats(pokemon.spDefensa, 100),
        velocidad: calculateStats(pokemon.velocidad, 100),
    };

    return (
        <Container>
            <Row className="my-4">
                <Col md={4}>
                    <Card>
                        <Card.Img variant="top" src={"http://localhost:3000/" + pokemon.id + ".jpg"} />
                        <Card.Body>
                            <Card.Title>{pokemon.nombre} - Pokédex Number: {pokemon.numero}</Card.Title>
                            <Card.Text>
                                <ListGroup>
                                    <ListGroupItem><strong>Types</strong></ListGroupItem>
                                    <ListGroupItem>{pokemon.tipo1.nombre} {pokemon.tipo2 ? " - " + pokemon.tipo2.nombre : ""}</ListGroupItem>
                                    <ListGroupItem><strong>Abilities</strong></ListGroupItem>
                                    <ListGroupItem>
                                        {pokemon.habilidad1.nombre} 
                                        {pokemon.habilidad2 ? " - " + pokemon.habilidad2.nombre : ""}
                                        {pokemon.habilidad3 ? " - " + pokemon.habilidad3.nombre : ""}
                                        </ListGroupItem>
                                    <ListGroupItem><strong>Descripcion</strong></ListGroupItem>
                                    <ListGroupItem>{pokemon.descripcion}</ListGroupItem>

                                </ListGroup>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card>
                        <Card.Body>
                            <Card.Title>Stats</Card.Title>
                            <Row>
                                <Col>
                                    <ListGroup>
                                        <ListGroupItem><strong>Base Stats</strong></ListGroupItem>
                                        <ListGroupItem>HP: {pokemon.hp}</ListGroupItem>
                                        <ListGroupItem>Ataque: {pokemon.ataque}</ListGroupItem>
                                        <ListGroupItem>Defensa: {pokemon.defensa}</ListGroupItem>
                                        <ListGroupItem>Sp. Ataque: {pokemon.spAtaque}</ListGroupItem>
                                        <ListGroupItem>Sp. Defensa: {pokemon.spDefensa}</ListGroupItem>
                                        <ListGroupItem>Velocidad: {pokemon.velocidad}</ListGroupItem>
                                    </ListGroup>
                                </Col>
                                <Col>
                                    <ListGroup>
                                        <ListGroupItem><strong>IVs (Nivel 50)</strong></ListGroupItem>
                                        <ListGroupItem>HP: {statsLevel50.hp.min} - {statsLevel50.hp.max}</ListGroupItem>
                                        <ListGroupItem>Ataque: {statsLevel50.ataque.min} - {statsLevel50.ataque.max}</ListGroupItem>
                                        <ListGroupItem>Defensa: {statsLevel50.defensa.min} - {statsLevel50.defensa.max}</ListGroupItem>
                                        <ListGroupItem>Sp. Ataque: {statsLevel50.spAtaque.min} - {statsLevel50.spAtaque.max}</ListGroupItem>
                                        <ListGroupItem>Sp. Defensa: {statsLevel50.spDefensa.min} - {statsLevel50.spDefensa.max}</ListGroupItem>
                                        <ListGroupItem>Velocidad: {statsLevel50.velocidad.min} - {statsLevel50.velocidad.max}</ListGroupItem>
                                    </ListGroup>
                                </Col>
                                <Col>
                                    <ListGroup>
                                        <ListGroupItem><strong>IVs (Nivel 100)</strong></ListGroupItem>
                                        <ListGroupItem>HP: {statsLevel100.hp.min} - {statsLevel100.hp.max}</ListGroupItem>
                                        <ListGroupItem>Ataque: {statsLevel100.ataque.min} - {statsLevel100.ataque.max}</ListGroupItem>
                                        <ListGroupItem>Defensa: {statsLevel100.defensa.min} - {statsLevel100.defensa.max}</ListGroupItem>
                                        <ListGroupItem>Sp. Ataque: {statsLevel100.spAtaque.min} - {statsLevel100.spAtaque.max}</ListGroupItem>
                                        <ListGroupItem>Sp. Defensa: {statsLevel100.spDefensa.min} - {statsLevel100.spDefensa.max}</ListGroupItem>
                                        <ListGroupItem>Velocidad: {statsLevel100.velocidad.min} - {statsLevel100.velocidad.max}</ListGroupItem>
                                    </ListGroup>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card>
                        <Card.Body>
                            <Card.Title>Evolution Line</Card.Title>
                            <ListGroup>
                                {Array.isArray(evolutionChain) && evolutionChain.length > 0 ? (
                                    evolutionChain.map((evolution) => (
                                        <ListGroupItem key={evolution.id}>
                                            <Link to={`/pokemon/${evolution.id}`}>
                                                {evolution.nombre} {evolution.id}
                                            </Link>
                                        </ListGroupItem>
                                    ))
                                ) : (
                                    <ListGroupItem>No evolutions available</ListGroupItem>
                                )}
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default PokemonDetail;