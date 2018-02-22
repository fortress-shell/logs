'use strict';
const {Transform} = require('streams');

/**
 * [jsonStream description]
 * @return {[type]} [description]
 */
function jsonStream() {
  return new Transform({
    objectMode: true,
    decodeStrings: true,
    async transform(message, encoding, next) {
      try {
        const content = JSON.parse(message.value);
        next(null, content);
      } catch(e) {
        next(e);
      }
    }
  });
}

module.exports = jsonStream;
