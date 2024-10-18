module.exports = (sequelize, Sequelize) => {
    const Habilidad = sequelize.define("habilidad", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nombre: {
            type: Sequelize.STRING,
        },
    });
    return Habilidad;
}