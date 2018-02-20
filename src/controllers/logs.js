class LogsController {
  constructor(io, db) {
    this.io = io;
    this.log = db.models.log;
  }
  async log(message) {
    await this.logToDabatase(message);
    this.logToWebSocket(message);
  }
  logToDabatase(message) {
    return this.log.create(message, {raw: true});
  }
  logToWebSocket(message) {
    this.io.to(message.roomId).emit(message);
  }
}

module.exports = LogsController;
