const {Writable} = require('stream');
const {INSERT_LOG} = require('src/queries/log');
const logger = require('src/utils/logger');
const config = require('src/config');
const UNIQUE_CONSTRAINT = config.get('UNIQUE_CONSTRAINT');

/**
 * Logs writable stream
 * @param  {Object} db pg-promise
 * @param  {Object} io socket.io-emitter
 * @return {Writable} writes to db and to redis pubsub
 */
function logsStream(db, io) {
  return new Writable({
    objectMode: true,
    async write(message, encoding, next) {
      try {
        await db.none(INSERT_LOG, message);
        io.to(message.build_id).emit(message);
        logger.info(message);
        next();
      } catch(err) {
        if (err.constraint === UNIQUE_CONSTRAINT) {
          next();
        } else {
          logger.error(err);
          next(err);
        }
      }
    },
  });
}

module.exports = logsStream;
