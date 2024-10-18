module.exports = (sequelize, Sequelize) => {
    const Pokemon = sequelize.define("pokemon", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nombre: {
            type: Sequelize.STRING,
        },
        numero: {
            type: Sequelize.INTEGER,
        },
        tipoId_1: {
            type: Sequelize.INTEGER,
        },
        tipoId_2: {
            type: Sequelize.INTEGER,
        },
        habilidadId_1: {
            type: Sequelize.INTEGER,
        },
        habilidadId_2: {
            type: Sequelize.INTEGER,
        },
        habilidadId_3: {
            type: Sequelize.INTEGER,
        },
        lvlEvolucion: {
            type: Sequelize.INTEGER,
        },
        evolucionPrevia: {
            type: Sequelize.INTEGER,
            allowNull: true,
        },
        evolucionPosterior: {
            type: Sequelize.INTEGER,
            allowNull: true,
        },
        descripcion: {
            type: Sequelize.STRING,
        },
        hp: {
            type: Sequelize.INTEGER,
        },
        ataque: {
            type: Sequelize.INTEGER,
        },
        defensa: {
            type: Sequelize.INTEGER,
        },
        spAtaque: {
            type: Sequelize.INTEGER,
        },
        spDefensa: {
            type: Sequelize.INTEGER,
        },
        velocidad: {
            type: Sequelize.INTEGER,
        }
    });
    return Pokemon;
}