'use strict';
const mysql = require('mysql');
const config = require('src/config');
const MYSQL_URL = config.get('MYSQL_URL');
const pool  = mysql.createPool(MYSQL_URL);

module.exports = pool;
