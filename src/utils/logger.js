const debug = require('debug');
const info = debug('logs:info');
const warn = debug('logs:warn');
const log = debug('logs:log');
const error = debug('logs:error');

module.exports = {
  info,
  warn,
  log,
  error,
};
