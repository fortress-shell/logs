'use strict';

exports.INSERT_LOGS = `
  INSERT INTO logs(build_id, position, content)
    VALUES($/build_id/, $/position/, /content/);
`;
