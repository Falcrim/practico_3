const db = require("../models");
const { isRequestValid, sendError500 } = require("../utils/request.utils");
// Estados del servidor
//200 -> ok
//201 -> creado
//400 -> validaciones
//401 -> no autorizado
//403 -> prohibido
//404 -> no encontrado
//500 -> errores del servidor

exports.findAll = async (req, res) => {
    try {
        const pokemones = await db.pokemon.findAll(
            {
                include: [
                    {
                        model: db.tipo,
                        as: 'tipo1'
                    },
                    {
                        model: db.tipo,
                        as: 'tipo2'
                    },
                    {
                        model: db.habilidad,
                        as: 'habilidad1'
                    },
                    {
                        model: db.habilidad,
                        as: 'habilidad2'
                    },
                    {
                        model: db.habilidad,
                        as: 'habilidad3'
                    },
                    {
                        model: db.pokemon,
                        as: 'evolucionPrev'
                    },
                    {
                        model: db.pokemon,
                        as: 'evolucionPost'
                    }
                ]
            }
        );
        res.status(200).json(pokemones);
    } catch (error) {
        res.status(500).json({
            msg: "Error en la base de datos"
        });
    }
}

exports.create = async (req, res) => {
    const requiredFields = [
        'nombre', 'numero',
        'tipoId_1', 'habilidadId_1',
        'habilidadId_2', 'descripcion',
        'hp', 'ataque',
        'defensa', 'spAtaque',
        'spDefensa', 'velocidad'];
    if (!isRequestValid(requiredFields, req.body, res)) {
        return;
    }
    try {
        const pokemon = {
            nombre: req.body.nombre,
            numero: req.body.numero,
            tipoId_1: req.body.tipoId_1,
            habilidadId_1: req.body.habilidadId_1,
            habilidadId_2: req.body.habilidadId_2,
            descripcion: req.body.descripcion,
            hp: req.body.hp,
            ataque: req.body.ataque,
            defensa: req.body.defensa,
            spAtaque: req.body.spAtaque,
            spDefensa: req.body.spDefensa,
            velocidad: req.body.velocidad
        };

        if (req.body.tipoId_2) {
            pokemon.tipoId_2 = req.body.tipoId_2;
        }
        if (req.body.habilidadId_3) {
            pokemon.habilidadId_3 = req.body.habilidadId_3;
        }
        if (req.body.lvlEvolucion) {
            pokemon.lvlEvolucion = req.body.lvlEvolucion;
        }
        if (req.body.evolucionPrevia) {
            pokemon.evolucionPrevia = req.body.evolucionPrevia;
        }
        if (req.body.evolucionPosterior) {
            pokemon.evolucionPosterior = req.body.evolucionPosterior;
        }

        const cretedPokemon = await db.pokemon.create(pokemon);
        res.status(201).json(cretedPokemon);
    } catch (error) {
        sendError500(error);
    }

}

exports.findOne = async (req, res) => {
    try {
        const pokemon = await db.pokemon.findByPk(
            req.params.id,
            {
                include: [
                    {
                        model: db.tipo,
                        as: 'tipo1'
                    },
                    {
                        model: db.tipo,
                        as: 'tipo2'
                    },
                    {
                        model: db.habilidad,
                        as: 'habilidad1'
                    },
                    {
                        model: db.habilidad,
                        as: 'habilidad2'
                    },
                    {
                        model: db.habilidad,
                        as: 'habilidad3'
                    },
                    {
                        model: db.pokemon,
                        as: 'evolucionPrev'
                    },
                    {
                        model: db.pokemon,
                        as: 'evolucionPost'
                    }
                ]
            }
        );
        if (pokemon) {
            res.status(200).json(pokemon);
        } else {
            res.status(404).json({
                msg: "Pokemon no encontrado"
            });
        }
    } catch (error) {
        sendError500(error);
    }
}

exports.getLineaEvolutiva = async (req, res) => {
    //4 casos
    //caso 0: no tiene evolución
    let objPokemon = await db.pokemon.findByPk(req.params.id,
        {
            include: [
                {
                    model: db.pokemon,
                    as: 'evolucionPrev'
                },
                {
                    model: db.pokemon,
                    as: 'evolucionPost'
                }
            ]
        });
        // console.log("----------------------------",objPokemon, "--------LLEGOOOOOO");
    if (objPokemon.evolucionPrevia === null && objPokemon.evolucionPosterior === null) {
        res.status(200).json(objPokemon);
        return;
    }
    //caso 1: pokemon inicial es el actual
    if (objPokemon.evolucionPrevia === null) {
        const respuesta = [];
        respuesta.push(objPokemon);
        while (objPokemon.evolucionPosterior !== null) {
            respuesta.push(objPokemon.evolucionPost);
            objPokemon = await db.pokemon.findByPk(objPokemon.evolucionPosterior,
                {
                    include: [
                        {
                            model: db.pokemon,
                            as: 'evolucionPost'
                        }
                    ]
                }
            );
        }
        res.status(200).json(respuesta);
        return;
    }
    //caso 2: pokemon final es el actual
    if (objPokemon.evolucionPosterior === null) {
        const respuesta = [];
        while (objPokemon.evolucionPrevia !== null) {
            // let aux = await db.pokemon.findByPk(objPokemon.evolucionPrevia);
            respuesta.push(objPokemon);
            // console.log("AQUI----",aux, "---PREVIA");
            objPokemon = await db.pokemon.findByPk(objPokemon.evolucionPrevia,
                {
                    include: [
                        {
                            model: db.pokemon,
                            as: 'evolucionPrev'
                        }
                    ]
                }
            );
        }
        respuesta.push(objPokemon);
        respuesta.reverse();
        res.status(200).json(respuesta);
        return;
    }
    //caso 3: pokemon intermedio es el actual
    const respuesta = [];
    while (objPokemon.evolucionPrevia !== null) {
        respuesta.push(objPokemon.evolucionPrev);
        objPokemon = await db.pokemon.findByPk(objPokemon.evolucionPrevia,
            {
                include: [
                    {
                        model: db.pokemon,
                        as: 'evolucionPrev'
                    },
                    {
                        model: db.pokemon,
                        as: 'evolucionPost'
                    }
                ]
            }
        );
    }
    respuesta.reverse();
    // respuesta.push(objPokemon);
    while (objPokemon.evolucionPosterior !== null) {
        respuesta.push(objPokemon.evolucionPost);
        objPokemon = await db.pokemon.findByPk(objPokemon.evolucionPosterior,
            {
                include: [
                    {
                        model: db.pokemon,
                        as: 'evolucionPrev'
                    },
                    {
                        model: db.pokemon,
                        as: 'evolucionPost'
                    }
                ]
            }
        );
    }
    
    res.status(200).json(respuesta);
}

exports.update = async (req, res) => {
    const requiredFields = ['nombre', 'numero',
        'tipoId_1', 'habilidadId_1',
        'habilidadId_2', 'descripcion',
        'hp', 'ataque',
        'defensa', 'spAtaque',
        'spDefensa', 'velocidad'];
    if (!isRequestValid(requiredFields, req.body, res)) {
        return;
    }
    try {
        const pokemon = {
            nombre: req.body.nombre,
            numero: req.body.numero,
            tipoId_1: req.body.tipoId_1,
            habilidadId_1: req.body.habilidadId_1,
            habilidadId_2: req.body.habilidadId_2,
            descripcion: req.body.descripcion,
            hp: req.body.hp,
            ataque: req.body.ataque,
            defensa: req.body.defensa,
            spAtaque: req.body.spAtaque,
            spDefensa: req.body.spDefensa,
            velocidad: req.body.velocidad
        };

        if (req.body.tipoId_2) {
            pokemon.tipoId_2 = req.body.tipoId_2;
        }
        if (req.body.habilidadId_3) {
            pokemon.habilidadId_3 = req.body.habilidadId_3;
        }
        if (req.body.lvlEvolucion) {
            pokemon.lvlEvolucion = req.body.lvlEvolucion;
        }
        if (req.body.evolucionPrevia) {
            pokemon.evolucionPrevia = req.body.evolucionPrevia;
        }
        if (req.body.evolucionPosterior) {
            pokemon.evolucionPosterior = req.body.evolucionPosterior;
        }

        const updatedPokemon = await db.pokemon.update(pokemon, {
            where: {
                id: req.params.id
            }
        });
        res.status(200).json(updatedPokemon);
    } catch (error) {
        sendError500(error);
    }
}

exports.updatePatch = async (req, res) => {
    try {
        const updatedPokemon = await db.pokemon.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        res.status(200).json(updatedPokemon);
    } catch (error) {
        sendError500(error);
    }
}

exports.delete = async (req, res) => {
    try {
        const pokemon = await db.pokemon.destroy({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json(pokemon);
    } catch (error) {
        sendError500(error);
    }
}

exports.searchByName = async (req, res) => {
    try {
        const pokemones = await db.pokemon.findAll({
            //where like
            where: {
                nombre: {
                    [db.Sequelize.Op.like]: `%${req.params.name}%`
                }
            }
        });
        res.status(200).json(pokemones);
    } catch (error) {
        sendError500(error);
    }
}

exports.uploadPicture = async (req, res) => {
    const id = req.params.id;
    try {
        const pokemon = await getPokemonOr404(id, res);
        if (!pokemon) {
            return;
        }
        if (!req.files) {
            res.status(400).json({
                msg: 'No se ha enviado el archivo'
            });
            return;
        }
        const file = req.files.fotoPerfil;
        const fileName = pokemon.id + '.jpg';
        file.mv(`public/${fileName}`);
        await pokemon.save();
        res.json(pokemon);
    } catch (error) {
        sendError500(error);
    }
}

async function getPokemonOr404(id, res) {
    const pokemon = await db.pokemon.findByPk(id);
    if (!pokemon) {
        res.status(404).json({
            msg: 'Pokemon no encontrada'
        });
        return;
    }
    return pokemon;
}