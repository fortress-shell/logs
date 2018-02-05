'use strict';
const client = require("src/resources/kafka");
const producer = new Producer(client);

module.exports = producer;
