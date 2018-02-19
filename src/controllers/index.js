
const INSERT_INTO_LOGS = `
    INSERT INTO logs(
      status,
      timestamps
    ) VALUES(:status, :timestamps);
`;

function LogsController(io, db) {
  return {
    async log(message) {
      await db.query(INSERT_INTO_LOGS, {
        replacements: message,
        type: db.QueryTypes.INSERT,
      });
      io.to(message.roomId).emit(content);
    },
  };
}

module.exports = LogsController;
