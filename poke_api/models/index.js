const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,
    {
        host: dbConfig.HOST,
        port: dbConfig.PORT,
        dialect: "mysql",
    }
);
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;


db.tipo = require("./tipo.model.js")(sequelize, Sequelize);
db.habilidad = require("./habilidad.model.js")(sequelize, Sequelize);
db.pokemon = require("./pokemon.model.js")(sequelize, Sequelize);

// Pokemon - Tipo
db.tipo.hasMany(db.pokemon, { as: "pokemon" });
db.pokemon.belongsTo(db.tipo, {
    foreignKey: "tipoId_1",
    as: "tipo1",
});
db.pokemon.belongsTo(db.tipo, {
    foreignKey: "tipoId_2",
    as: "tipo2",
});

// Pokemon - Habilidad
db.habilidad.hasMany(db.pokemon, { as: "pokemon" });
db.pokemon.belongsTo(db.habilidad, {
    foreignKey: "habilidadId_1",
    as: "habilidad1",
});
db.pokemon.belongsTo(db.habilidad, {
    foreignKey: "habilidadId_2",
    as: "habilidad2",
});
db.pokemon.belongsTo(db.habilidad, {
    foreignKey: "habilidadId_3",
    as: "habilidad3",
});

// Pokemon - Evolucion Previa
// db.pokemon.hasOne(db.pokemon, { as: "evolucionPrev" });
db.pokemon.belongsTo(db.pokemon, {
    foreignKey: "evolucionPrevia",
    as: "evolucionPrev",
});

// Pokemon - Evolucion Posterior
// db.pokemon.hasOne(db.pokemon, { as: "evolucionPost" });
db.pokemon.belongsTo(db.pokemon, {
    foreignKey: "evolucionPosterior",
    as: "evolucionPost",
});

module.exports = db;