'use strict';

exports.INSERT_LOG = `
  INSERT INTO logs(
    position,
    build_id,
    content,
    created_at,
    updated_at
  ) VALUES(
    $(build_id) :: INT,
    $(position),
    $(content),
    current_timestamp,
    current_timestamp
  );
`;
