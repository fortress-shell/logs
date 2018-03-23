'use strict';

exports.INSERT_LOG = `
  INSERT INTO logs(
    position,
    build_id,
    stage,
    command,
    content
  ) VALUES(
    $(build_id) :: INT,
    $(position),
    $(stage),
    $(command),
    $(content)
  );
`;

// build_id
// position
// content
// stage
// command
