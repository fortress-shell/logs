/**
 * LogsController
 */
class LogsController {
/**
 * Logs constructor
 * @param  {[type]} io [description]
 * @param  {[type]} db [description]
 */
  constructor(io, db) {
    this.io = io;
    this.log = db.models.log;
  }
  /**
   * Log message to database and to websocket
   * @param  {Object} message [description]
   */
  async log(message) {
    await this.logToDabatase(message);
    this.logToWebSocket(message);
  }
  /**
   * Logs message to database
   * @param  {Object} message [description]
   * @return {Promise}         [description]
   */
  logToDabatase(message) {
    return this.log.create(message, {raw: true});
  }
  /**
   * Logs message to websocket
   * @param  {Object} message [description]
   */
  logToWebSocket(message) {
    this.io.to(message.roomId).emit(message);
  }
}

module.exports = LogsController;
