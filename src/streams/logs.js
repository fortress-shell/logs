'use strict';
const {Writable} = require('stream');
const {INSERT_LOG} = require('src/queries/log');
const logger = require('src/utils/logger');
const config = require('src/config');
const UNIQUE = config.get('db:unique');

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
      logger.info(message);
      try {
        await db.none(INSERT_LOG, message);
        logger.info(message);
        io.to(`user:${message.user_id}`)
          .emit(`logs:${message.build_id}:new`, message);
        next();
      } catch (err) {
        if (err.constraint === UNIQUE) {
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
