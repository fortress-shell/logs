'use strict';
const io = require('src/resources/io');
const {db, pgp} = require('src/resources/db');
const redis = require('src/resources/redis');
const logger = require('src/utils/logger');
const jsonStream = require('src/streams/json')();
const logsStream = require('src/streams/logs')(db, io);
const kafkaStream = require('src/resources/kafka')();

kafkaStream
  .on('error', shutdown)
  .pipe(jsonStream)
  .on('error', shutdown)
  .pipe(logsStream)
  .on('error', shutdown);

function shutdown(topLevelError) {
  if (topLevelError) {
    logger.warn(topLevelError);
    process.exit(1);
  }
  kafkaStream.close((err) => {
    if (err || topLevelError) {
      logger.warn(err);
      process.exit(1);
    }
    logger.info('Going to shutdown!');
    setTimeout(() => {
        redis.end();
        pgp.end();
        logger.info('Goodbye!');
        process.exit();
    }, 10000);
  });
}

process.once('SIGINT', shutdown);
