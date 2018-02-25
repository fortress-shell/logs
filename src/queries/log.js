'use strict';

exports.INSERT_LOG = `
  INSERT INTO logs(position, build_id, content)
    VALUES($(build_id), $(position), $(content));
`;
