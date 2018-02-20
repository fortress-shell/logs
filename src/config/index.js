'use strict';
const nconf = require('nconf');
const path = require('path');
nconf.env([
  'NODE_ENV',
  'DB_URL',
  'REDIS_URL',
  'KAFKA_URL',
]);
nconf.defaults({
  NODE_ENV: 'development',
});
nconf.required([
  'REDIS_URL',
  'DB_URL',
  'KAFKA_URL',
]);
const NODE_ENV = nconf.get('NODE_ENV');
nconf.file(NODE_ENV, {
  file: path.join(__dirname, `${NODE_ENV}.json`),
});
nconf.file('default', {
  file: path.join(__dirname, 'default.json'),
});

module.exports = nconf;
