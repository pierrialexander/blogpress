const Sequelize = require('sequelize');

const connection = new Sequelize('blogpress', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;