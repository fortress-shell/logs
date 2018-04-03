'use strict';

exports.INSERT_LOG = `
  INSERT INTO logs(
    position,
    build_id,
    content,
    created_at,
    updated_at
  ) VALUES(
    $(build_id),
    $(position),
    $(content),
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
  );
`;
