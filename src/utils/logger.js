'use strict';
const debug = require('debug');

exports.info = debug('logs:info');
exports.warn = debug('logs:warn');
exports.log = debug('logs:log');
exports.error = debug('logs:error');
