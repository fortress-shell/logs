'use strict';
const {Client} = require('kafka-node');
const config = require('src/config');
const KAFKA_URL = config.get("KAFKA_URL");
const client = new Client(KAFKA_URL);

module.exports = client;
