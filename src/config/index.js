'use strict';
const nconf = require('nconf');
const path = require('path');

const optional = [
  'NODE_ENV',
];
const required = [
  'REDIS_URL',
  'DATABASE_URL',
  'KAFKA_URL',
];
const defaults = {
  NODE_ENV: 'development',
};
nconf.env(optional.concat(required));
nconf.defaults(defaults);
const NODE_ENV = nconf.get('NODE_ENV');
if (NODE_ENV !== 'testing') {
  nconf.required(required);
}
nconf.file(NODE_ENV, path.join(__dirname, `${NODE_ENV}.json`));
nconf.file('default', path.join(__dirname, 'default.json'));

module.exports = nconf;
