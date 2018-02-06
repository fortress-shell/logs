'use strict';
const io = require('src/resources/io');
const redis = require('src/resources/redis');
const kafka = require('src/resources/kafka');
const producer = require('src/resources/producer');
const db = require('src/resources/mysql');
const winston = require('winston')

function onShutdown() {

}

for (const event of ['SIGINT', 'SIGTERM']) {

  process.once(event, onShutdown);
}
