'use strict';
const {Transform} = require('stream');

/**
 * Json transformer stream
 * @param {String} key key for object to ask
 * @return {Transform} transformed stream of POJSO
 */
function jsonStream(key) {
  return new Transform({
    objectMode: true,
    decodeStrings: true,
    transform(message, encoding, next) {
      try {
        const content = JSON.parse(message[key]);
        next(null, content);
      } catch (e) {
        next(e);
      }
    },
  });
}

module.exports = jsonStream;
