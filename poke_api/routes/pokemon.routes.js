module.exports = app => {
    let router = require("express").Router();
    const controller = require("../controllers/pokemon.controller.js")

    router.get('/', controller.findAll);
    router.post('/', controller.create);
    router.get('/:id', controller.findOne);
    router.put('/update/:id', controller.update);
    router.patch('/update/:id', controller.updatePatch);
    router.delete('/delete/:id', controller.delete);
    router.get('/linea/:id', controller.getLineaEvolutiva);
    router.post('/:id/foto', controller.uploadPicture);

    router.get('/search/:name', controller.searchByName);

    app.use('/pokemon', router);

};