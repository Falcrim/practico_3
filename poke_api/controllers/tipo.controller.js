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

exports.findTipo = async (req, res) => {
    try {
        const tipos = await db.tipo.findAll();
        console.log(tipos);
        res.status(200).json(tipos);
    } catch (error) {
        res.status(500).json({
            msg: "Error en la base de datos"
        });
    }
}

exports.findOne = async (req, res) => {
    try {
        const tipo = await db.tipo.findOne({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json(tipo);
    } catch (error) {
        sendError500(error);
    }
}

exports.create = async (req, res) => {
    const requiredFields = ['nombre'];
    if (!isRequestValid(requiredFields, req.body, res)) {
        return;
    }
    try {
        const tipo = await db.tipo.create({
            nombre: req.body.nombre
        });
        res.status(201).json(tipo);
    } catch (error) {
        sendError500(error);
    }
}

exports.update = async (req, res) => {
    const requiredFields = ['nombre'];
    if (!isRequestValid(requiredFields, req.body, res)) {
        return;
    }
    try {
        const tipo = await db.tipo.update({
            nombre: req.body.nombre
        }, {
            where: {
                id: req.params.id
            }
        });
        res.status(200).json(tipo);
    } catch (error) {
        sendError500(error);
    }
}

exports.delete = async (req, res) => {
    try {
        const tipo = await db.tipo.destroy({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json(tipo);
    } catch (error) {
        sendError500(error);
    }
}