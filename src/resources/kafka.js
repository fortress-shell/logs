'use strict';
const {Producer, Client, KeyedMessage} = require('kafka-node');
const config = require('src/config');
const client = new Client(config.get("KAFKA_URL"));

module.exports = client;
