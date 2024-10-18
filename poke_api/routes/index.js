module.exports = app => {
    require('./tipo.routes')(app);
    require('./habilidad.routes')(app);
    require('./pokemon.routes')(app);
}