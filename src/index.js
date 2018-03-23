'use strict';
const io = require('src/resources/io');
const {db, pgp} = require('src/resources/db');
const redis = require('src/resources/redis');
const logger = require('src/utils/logger');
const jsonStream = require('src/streams/json')();
const logsStream = require('src/streams/logs')(db, io);
const kafkaStream = require('src/resources/kafka')();
const TIMEOUT = 10000
const FAILURE = 1
const SUCCESS = 0

kafkaStream
  .on('error', shutdown)
  .pipe(jsonStream)
  .on('error', shutdown)
  .pipe(logsStream)
  .on('error', shutdown);

function shutdown(topLevelError) {
  console.log("Shutting down")
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
