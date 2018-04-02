'use strict';
const {Transform} = require('stream');

/**
 * Json transformer stream
 * @return {Transform} transformed stream of POJSO
 */
function jsonStream() {
  return new Transform({
    objectMode: true,
    decodeStrings: true,
    transform(message, encoding, next) {
      try {
        const content = JSON.parse(message.value);
        next(null, content);
      } catch (e) {
        next(e);
      }
    },
  });
}

module.exports = jsonStream;
