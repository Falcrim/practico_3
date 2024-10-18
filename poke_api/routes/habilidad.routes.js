module.exports = app => {
    let router = require("express").Router();
    const controller = require("../controllers/habilidad.controller.js")

    router.get('/', controller.findAll);
    router.post('/', controller.create);
    router.get('/:id', controller.findOne);
    router.put('/update/:id', controller.update);
    router.delete('/delete/:id', controller.delete);
    app.use('/habilidad', router);

}