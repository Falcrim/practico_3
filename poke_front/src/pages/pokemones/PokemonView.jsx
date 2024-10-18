import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import NavViewMenu from '../../components/NavViewMenu';

const PokemonView = () => {
    const [pokemons, setPokemons] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        getListaPokemones();
        document.title = "Prueba título";
    }, [])

    const getListaPokemones = () => {
        axios.get('http://localhost:3000/pokemon')
            .then(res => {
                setPokemons(res.data);
                // console.log(res.data, "Lita de Pokemones");
            }).catch(error => {
                console.log(error);
            });
    }

    const handleSearch = (event) => {
        setSearchQuery(event.target.value.toLowerCase());
    };

    const filteredPokemons = pokemons.filter((pokemon) => {
        return (
            pokemon.nombre.toLowerCase().includes(searchQuery) ||
            pokemon.numero.toString().includes(searchQuery) ||
            pokemon.tipo1.nombre.toLowerCase().includes(searchQuery) ||
            (pokemon.tipo2 && pokemon.tipo2.nombre.toLowerCase().includes(searchQuery))
        );
    });

    return (
        <div>
            <NavViewMenu />
            <h1>Pokedex</h1>
            <input type="text" placeholder="Buscar Pokemon" onChange={handleSearch} />
            <br />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                {filteredPokemons.map((pokemon) => (
                    <div key={pokemon.id} style={{ margin: '10px 0' }}>
                        <Link to={`/pokemon/${pokemon.id}`}>
                            <img src={"http://localhost:3000/" + pokemon.id + ".jpg"} alt={pokemon.nombre} style={{ width: '200px' }} />
                            <h3>{pokemon.nombre} #{pokemon.numero} {pokemon.tipo1.nombre}{pokemon.tipo2 ? "-" + pokemon.tipo2.nombre : ''}</h3>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PokemonView;

//buscar pokemones por nombre o numero de pokedex
// const buscar = (e) => {
//     const search = e.target.value;
//     if (search === "") {
//         getListaPokemones();
//         return;
//     }
//     axios.get(`http://localhost:3000/pokemon/search/${search}`)
//         .then(res => {
//             setPokemons(res.data);
//             console.log(res.data, "Lista de Busqueda");
//         }).catch(error => {
//             console.log(error);
//         });
// }