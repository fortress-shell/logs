'use strict';
const consumerGroupStream = require('src/resources/kafka');
const io = require('src/resources/io');
const db = require('src/resources/db');
const logsStream = require('src/streams/logs');
const jsonSteam = require('src/streams/json');
const logger = require('src/utils/logger');

const stream = consumerGroupStream()
  .pipe(jsonSteam())
  .pipe(logsStream(io, db));

/**
 * Gracefull shutdown handler
 */
function onShutdown() {
  logger.log('Going to shutdown!');
  stream.close(() => {
    db.close();
    logger.log('Closed!');
    process.exit(0);
  });
}

for (const event of ['SIGTERM', 'SIGINT']) {
  process.once(event, onShutdown);
}
