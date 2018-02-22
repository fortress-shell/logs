const {Writable} = require('streams');

/**
 * [logsStream description]
 * @param  {[type]} db [description]
 * @param  {[type]} io [description]
 * @return {[type]}    [description]
 */
function dbStream(io) {
  return new Writable({
    objectMode: true,
    write(message, encoding, next) {
      io.to(message.room_id).emit(message);
      next();
    }
  });
}

module.exports = logsStream;
