const {Writable} = require('streams');

/**
 * [logsStream description]
 * @param  {[type]} db [description]
 * @param  {[type]} io [description]
 * @return {[type]}    [description]
 */
function logsStream(db, io) {
  return new Writable({
    objectMode: true,
    async write(message, encoding, next) {
      try {
        await db.models.log.create(message, {raw: true});
        io.to(message.roomId).emit(message);
        next();
      } catch (e) {
        return next(e);
      }
    }
  });
}

module.exports = logsStream;
