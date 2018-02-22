'use strict';
const consumerGroupStream = require('src/resources/kafka');
const io = require('src/resources/io');
const db = require('src/resources/db');
const dbStream = require('src/streams/db');
const jsonSteam = require('src/streams/json');
const wsSteam = require('src/streams/ws');
const logger = require('src/utils/logger');
const consumerGroupStream$ = consumerGroupStream();
const logsStream$ = consumerGroupStream$.pipe(jsonSteam());

logsStream$.pipe(dbStream(db));
logsStream$.pipe(ioStream(io));

/**
 * Gracefull shutdown handler
 */
function onShutdown() {
  logger.log('Going to shutdown!');
  consumerGroupStream$.close(() => {
    db.close();
    logger.log('Closed!');
    process.exit(0);
  });
}

for (const event of ['SIGTERM', 'SIGINT']) {
  process.once(event, onShutdown);
}
