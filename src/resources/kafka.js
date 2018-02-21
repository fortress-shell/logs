'use strict';
const {Client} = require('kafka-node');
const config = require('src/config');
const KAFKA_URL = config.get('KAFKA_URL');
const {options, topics} = config.get('kafka');
const consumerOptions = Object.assign(options, {
  kafkaHost: KAFKA_URL,
});

module.exports = () => new ConsumerGroupStream(consumerOptions, topics);
