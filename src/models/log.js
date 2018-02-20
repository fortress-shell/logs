'use strict';
module.exports = (sequelize, DataTypes) => sequelize.define('log', {
  buildId: {
    type: DataTypes.INTEGER,
    field: 'build_id',
    allowNull: false,
  },
  position: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  content: DataTypes.STRING,
}, {
  tableName: 'logs',
  underscored: true,
});
