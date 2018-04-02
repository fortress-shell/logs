'use strict';
const {ConsumerGroupStream} = require('kafka-node');
const uuidv4 = require('uuid/v4');
const config = require('src/config');
const KAFKA_URL = config.get('KAFKA_URL');
const {options, datacenters} = config.get('kafka');
const consumerOptions = Object.assign(options, {
  kafkaHost: KAFKA_URL,
  id: uuidv4(),
});

/**
 * Kafka stream factory
 * @return {ConsumerGroupStream} kafka readable stream
 */
function kafkaStream() {
  return new ConsumerGroupStream(consumerOptions, datacenters);
}

module.exports = kafkaStream;
