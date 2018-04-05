'use strict';
const io = require('src/resources/io');
const {db, pgp} = require('src/resources/db');
const redis = require('src/resources/redis');
const logger = require('src/utils/logger');
const jsonStream = require('src/streams/json')('value');
const logsStream = require('src/streams/logs')(db, io);
const kafkaStream = require('src/resources/kafka')();
const [TIMEOUT, SUCCESS, FAILURE] = [10000, 0, 1];

kafkaStream
  .on('error', shutdown)
  .pipe(jsonStream)
  .on('error', shutdown)
  .pipe(logsStream)
  .on('error', shutdown);

/**
 * Shutdown handler
 * @param  {Error} topLevelError error causing shutdown
 */
function shutdown(topLevelError) {
  logger.info('Shutting down', topLevelError);
  if (topLevelError) {
    logger.warn(topLevelError);
    process.exit(FAILURE);
  }
  kafkaStream.close((err) => {
    if (err || topLevelError) {
      logger.warn(err);
      process.exit(FAILURE);
    }
    logger.info('Going to shutdown!');
    setTimeout(() => {
        redis.end();
        pgp.end();
        logger.info('Goodbye!');
        process.exit(SUCCESS);
    }, TIMEOUT);
  });
}

process.once('SIGINT', shutdown);
