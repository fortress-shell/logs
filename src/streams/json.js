const {Transform} = require('streams');

/**
 * [jsonStream description]
 * @return {[type]} [description]
 */
function jsonStream() {
  return new Transform({
    objectMode: true,
    decodeStrings: true,
    transform(message, encoding, next) {
      try {
        message.value = JSON.parse(message.value);
        next(null, message);
      } catch(e) {
        next(e);
      }
    }
  });
}

module.exports = jsonStream;
