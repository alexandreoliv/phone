const {
    Sequelize
} = require('sequelize');

module.exports = new Sequelize(process.env.PG_DATABASE, process.env.PG_USERNAME, process.env.PG_PASSWORD, {
    host: process.env.PG_HOST,
    dialect: 'postgres',
    define: {
        freezeTableName: true
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});