const {Writable} = require('streams');
const {INSERT_LOGS} = require('src/queries/logs');

/**
 * [logsStream description]
 * @param  {[type]} db [description]
 * @param  {[type]} io [description]
 * @return {[type]}    [description]
 */
function dbStream(db) {
  return new Writable({
    objectMode: true,
    write(message, encoding, next) {
      db.none(INSERT_LOGS, message).then(next, next);
    }
  });
}

module.exports = logsStream;
