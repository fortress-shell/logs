const Sequelize = require('sequalize');
const config = require('src/config');
const DB_URL = config.get('DB_URL');

module.exports = new Sequelize(DB_URL, {
  dialect: 'mysql',
  operatorsAliases: false,
});
