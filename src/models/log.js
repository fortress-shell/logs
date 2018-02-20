const Sequelize = require('sequelize');
const sequelize = require('src/resources/db');

module.exports = sequelize.define('log', {
  buildId: {
    type: Sequelize.INTEGER,
    field: 'build_id',
    allowNull: false,
  },
  position: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  content: Sequelize.STRING
}, {
  tableName: 'logs',
  underscored: true,
});