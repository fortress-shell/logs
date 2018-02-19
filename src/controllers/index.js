const INSERT_INTO_LOGS = `
    INSERT INTO logs(
      status,
      timestamps
    ) VALUES(:status, :timestamps);
`;

class LogsController {
  constructor(io, db) {
    this.io = io;
    this.db = db;
  }
  async log(message) {
    await this.db.query(INSERT_INTO_LOGS, {
      replacements: message,
      type: this.db.QueryTypes.INSERT,
    });
    this.io.to(message.roomId).emit(content);
  }
}

module.exports = LogsController;
