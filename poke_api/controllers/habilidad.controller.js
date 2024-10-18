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
        const habilidades = await db.habilidad.findAll();
        res.status(200).json(habilidades);
    } catch (error) {
        res.status(500).json({
            msg: "Error en la base de datos"
        });
    }
}

exports.findOne = async (req, res) => {
    try {
        const habilidad = await db.habilidad.findOne({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json(habilidad);
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
        const habilidad = await db.habilidad.create({
            nombre: req.body.nombre
        });
        res.status(201).json(habilidad);
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
        const habilidad = await db.habilidad.update({
            nombre: req.body.nombre
        }, {
            where: {
                id: req.params.id
            }
        });
        res.status(200).json(habilidad);
    } catch (error) {
        sendError500(error);
    }
}

exports.delete = async (req, res) => {
    try {
        const habilidad = await db.habilidad.destroy({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json(habilidad);
    } catch (error) {
        sendError500(error);
    }
}