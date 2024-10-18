module.exports = (sequelize, Sequelize) => {
    const Tipo = sequelize.define("tipo", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nombre: {
            type: Sequelize.STRING,
        },
    });
    return Tipo;
}