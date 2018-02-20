'use strict';
const Sequelize = require('sequelize');
const config = require('src/config');
const path = require('path');
const LOG_PATH = path.resolve('src/models/log');
const DB_URL = config.get('DB_URL');
const options = config.get('db');
const db = new Sequelize(DB_URL, options);

db.import(LOG_PATH);

module.exports = db;
