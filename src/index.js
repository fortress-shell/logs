const {HighLevelConsumer} = require('kafka-node');
const io = require('src/resources/io');
const client = require('src/resources/kafka');
const db = require('src/resources/db');
const config = require('src/config');
const {options, topics} = config.get('kafka');
const consumer = new HighLevelConsumer(client, topics, options);
const logs = new LogsController(io, db);

consumer.on('message', logs.log.bind(logs));
consumer.on('error', onShutdown);

/**
 * Gracefull shutdown handler
 */
function onShutdown() {
  client.close(() => db.close());
}

for (const event of ['SIGINT', 'SIGTERM']) {
  process.once(event, onShutdown);
}
