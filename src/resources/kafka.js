'use strict';
const {ConsumerGroupStream} = require('kafka-node');
const config = require('src/config');
const KAFKA_URL = config.get('KAFKA_URL');
const {options, datacenters} = config.get('kafka');
const consumerOptions = Object.assign(options, {
  kafkaHost: KAFKA_URL,
});

function kafkaStream() {
  return new ConsumerGroupStream(consumerOptions, datacenters);
}

module.exports = kafkaStream;
