/**
 * Error responses
 */

'use strict';

module.exports[404] = (req, res) => {
  const viewFilePath = '404';
  const statusCode = 404;
  const result = {
    status: statusCode
  };

  res.status(result.status);
  res.render(viewFilePath, function (err) {
    if (err) { return res.json(result, result.status); }

    return res.render(viewFilePath);
  });
};
